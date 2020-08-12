import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {getSystemPath, join, normalize} from '@angular-devkit/core';
import {existsSync, writeFile} from 'fs';
import {from, Observable, of} from 'rxjs';
import {catchError, debounceTime, map, mergeMap, scan, switchMap, tap} from 'rxjs/operators';
import {fileWatcher, findFileForMarkdown, readFileForMarkdownAndMetaData} from './file';
import {
  FileWatcherResult,
  MarkdownConvertBuilderResult,
  MarkdownFile,
  MarkDownFileInfo,
  MarkDownFileInfoList,
  MarkdownFileList,
  Options
} from './model';
import {error, info, loadTsRegister, logo, makeDirectorySync, uuid} from './utils';

export const logFsWatch = () => tap<FileWatcherResult>(
    (result) => info(`File ${result.eventName} :: ${result.path}`)
);

export const writeJsonFile = (outputPath: string, customTransform?: Function) => tap((markdownFileList: MarkdownFileList) => {
  writeFile(outputPath, JSON.stringify(markdownFileList.map((val: MarkdownFile) => {
    if (customTransform) {
      return {
        ...val,
        transData: customTransform(val.content),
      };
    }
    return val;
  }), null, 2), (err: Error) => {
    if (err) {
      error(err);
    } else {
      info(`Output JSON ${outputPath}`);
    }
  });
});


export const readFileMarkdown = () => mergeMap((fileInfoList: MarkDownFileInfoList) =>
    from<MarkDownFileInfoList>(fileInfoList).pipe(
        mergeMap(readFileForMarkdownAndMetaData)
    )
);

export const scanMarkdownFileInfo = () => scan<MarkDownFileInfo, MarkDownFileInfoList>(
    (fileInfo, cur) => [...fileInfo, cur],
    []
);

export const getOutputPath = (context: BuilderContext, mergeOptions: Options): string => {

  const ouputPath = getSystemPath(join(normalize(context.workspaceRoot), mergeOptions.output.path));
  const ouputFileName = mergeOptions.output.hash
      ? `${mergeOptions.output.name}-${uuid()}.json`
      : `${mergeOptions.output.name}.json`;
  if (existsSync(ouputPath)) {
    return `${ouputPath}/${ouputFileName}`;
  } else {
    makeDirectorySync(ouputPath);
    return `${ouputPath}/${ouputFileName}`;
    // throw Error('It is invaild path');
  }

};

export const getMarkdownPath = (context: BuilderContext, mergeOptions: Options): string => {
  if (!mergeOptions.input) {
    throw new Error('Please set input option');
  }
  const path = getSystemPath(join(normalize(context.workspaceRoot), mergeOptions.input));
  if (existsSync(path)) {
    return path;
  } else {
    throw Error('It is invalid path');
  }

};

export const getCustomTransformConfig = (context: BuilderContext, transform: string) => {
  return getSystemPath(join(normalize(context.workspaceRoot), transform));
};

export const registerCustomTransform = (context: BuilderContext, mergeOptions: Options) => {
  if (mergeOptions?.converter?.transform) {
    loadTsRegister();
    const customTransformConfig = getCustomTransformConfig(context, mergeOptions.converter.transform);

    try {
      const res = require(customTransformConfig);
      return res.markdownToHTML;
    } catch (e) {
      console.log('e-------------', e);
    }

  }
};


export function run(options: Options | any, context: BuilderContext): Observable<MarkdownConvertBuilderResult> {
  logo();
  const mergeOptions: Options = {
    ...options
  };
  const logger = context.logger;
  const customTransform = registerCustomTransform(context, mergeOptions);
  const markdownPath = getMarkdownPath(context, mergeOptions);
  const outputPath = getOutputPath(context, mergeOptions);

  return fileWatcher(markdownPath).pipe(
      logFsWatch(),
      switchMap(() =>
          findFileForMarkdown(markdownPath).pipe(
              readFileMarkdown(),
              scanMarkdownFileInfo(),
          )
      ),
      debounceTime(200),
      writeJsonFile(outputPath, customTransform),
      catchError(err => of(err)),
      map((result) => {
        if (result instanceof Error) {
          logger.error(result.message);
        }
        return {success: true};
      })
  );
}

export default createBuilder<Options>(run);
