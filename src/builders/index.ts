import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {join, normalize} from '@angular-devkit/core';
import {writeFile} from 'fs';
import {from, Observable, of} from 'rxjs';
import {catchError, debounceTime, map, mergeMap, scan, switchMap, tap,} from 'rxjs/operators';
import {readFileForMarkdownAndMetaData} from './file/read-file-for-markdown-and-meta-data';
import {fileWatcher} from './file/file-watcher';
import {
  FileWatcherResult,
  MarkdownConvertBuilderResult,
  MarkDownFileInfo,
  MarkDownFileInfoList,
  MarkdownFileList,
  Options
} from './model/model';
import {error, info} from './utils/log';
import {logo} from './utils/logo';
import {findFileForMarkdown} from './file/find-file-for-markdown';
import {uuid} from './utils/uuid';

export const logFsWatch = () => tap<FileWatcherResult>(
    (result) => info(`File ${result.eventName} :: ${result.path}`)
);
export const writeJsonFile = (outputPath: string) => tap((markdownFileList: MarkdownFileList) => {
  writeFile(outputPath, JSON.stringify(markdownFileList, null, 2), (err: Error) => {
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


export function run(options: Options | any, context: BuilderContext): Observable<MarkdownConvertBuilderResult> {
  logo();
  const mergeOptions: Options = {
    ...options
  };
  const logger = context.logger;
  if (!mergeOptions.input) {
    throw new Error('Please set input option');
  }

  const markdownPath = join(normalize(context.workspaceRoot), mergeOptions.input);
  const outputPath = join(normalize(context.workspaceRoot), `${mergeOptions.output.path}/${mergeOptions.output.hash
      ? mergeOptions.output.name + '-' + uuid() + '.json' : mergeOptions.output.name + '.json'
  }`);
  console.log('>>>>>>>> mergeOptions', mergeOptions);
  console.log('>>>>>>>> outputPath', outputPath);

  return fileWatcher(markdownPath).pipe(
      logFsWatch(),
      switchMap(() =>
          findFileForMarkdown(markdownPath).pipe(
              readFileMarkdown(),
              scanMarkdownFileInfo()
          )
      ),
      debounceTime(1000),
      writeJsonFile(outputPath),
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


