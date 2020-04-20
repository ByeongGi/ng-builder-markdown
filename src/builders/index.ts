import {from, Observable, of} from 'rxjs';
import {BuilderContext, BuilderOutput, createBuilder} from '@angular-devkit/architect';
import {join, JsonObject, normalize} from '@angular-devkit/core';
import {watch} from 'chokidar';
import {catchError, map, mergeMap, scan, switchMap, tap} from 'rxjs/operators';
import {findPathMarkdownFiles, readMarkdownFile} from './converter/utils';
import {writeFileSync} from 'fs';

export interface Options extends JsonObject {
  path: string;
}


export function runMarkdownFsWatcher(options: Options | any, context: BuilderContext) {
  const markdownPath = join(normalize(context.workspaceRoot), options.path);
  console.log('config Executing', markdownPath);
  const logger = context.logger;
  const watcher = watch(markdownPath, {
    interval: 200,
    alwaysStat: true,
  });

  return new Observable<{ eventName: string, path: string, detail: string } | BuilderOutput | any>((obs) => {
    context.reportStatus('EXEC.........');
    watcher.on('all', (eventName, path, details) => {
      obs.next({eventName, path, details});
    });
    watcher.on('error', (error) => {
      obs.error(error);
    });

    return () => {
      watcher.close();
      obs.complete();
    };
  }).pipe(
      switchMap(
          () => findPathMarkdownFiles(markdownPath).pipe(
              mergeMap((fileInfo) =>
                  from(fileInfo).pipe(
                      mergeMap((metadata) => readMarkdownFile(metadata)),
                  )
              ),
              scan((fileInfo, cur,) => [...fileInfo, cur], [])
          )
      ),
      tap(_ => console.log('_', writeFileSync(join(normalize(context.workspaceRoot), '/data.json'), JSON.stringify(_, null, 2)))),
      catchError((err) => of(err)),
      map((result) => {
        if (result instanceof Error) {
          logger.error(result.message);
        } else {
          logger.info(result);
        }
        return {success: true};
      }),
  );
}


export default createBuilder<Record<string, string> & any>(runMarkdownFsWatcher);
