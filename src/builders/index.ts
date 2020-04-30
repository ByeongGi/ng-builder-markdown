import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {join, normalize} from '@angular-devkit/core';
import {writeFile} from 'fs';
import {from, of} from 'rxjs';
import {catchError, debounceTime, map, mergeMap, scan, switchMap, tap,} from 'rxjs/operators';
import {readFileForMarkdown} from './file/read-file-for-markdown';
import {fileWatcher} from './file/file-watcher';
import {MarkdownFileList, Options} from './model/model';
import {error, info} from './utils/log';
import {logo} from './utils/logo';
import {findFileForMarkdown} from './file/find-file-for-markdown';

export function writeJsonFile(outputPath: string, markdownfileList: MarkdownFileList): void {
  return writeFile(outputPath, JSON.stringify(markdownfileList, null, 2), (err: Error) => {
    if (err) {
      error(err);
    } else {
      info(`Output JSON ${outputPath}`);
    }
  });
}

export function run(options: Options | any, context: BuilderContext) {
  logo();
  const logger = context.logger;

  const markdownPath = join(normalize(context.workspaceRoot), options.path);
  const outputPath = join(normalize(context.workspaceRoot), '/data.json');
  // console.log('>>>>>>>> options', options);

  return fileWatcher(markdownPath).pipe(
      tap((result) => {
        const msg = `File ${result.eventName} :: ${result.path}`;
        info(msg);
      }),
      switchMap(() =>
          findFileForMarkdown(markdownPath).pipe(
              /* TODO : refactoring */
              mergeMap((fileInfoList) =>
                  from(fileInfoList).pipe(
                      mergeMap((metadata) => readFileForMarkdown(metadata))
                  )
              ),
              scan((fileInfo, cur) => [...fileInfo, cur], [])
          )
      ),
      debounceTime(1000),
      tap((_) =>
          writeJsonFile(outputPath, _)
      ),
      catchError((err) => of(err)),
      map((result) => {
        if (result instanceof Error) {
          logger.error(result.message);
        }
        return {success: true};
      })
  );
}

export default createBuilder<Record<string, string> & any>(run);


