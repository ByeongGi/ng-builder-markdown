import {from, Observable, of} from 'rxjs';
import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {join, normalize} from '@angular-devkit/core';
import {FSWatcher, watch} from 'chokidar';
import {catchError, debounceTime, map, mergeMap, scan, switchMap, tap} from 'rxjs/operators';
import {findPathMarkdownFilesObs, readMarkdownFileObs} from './converter/coverter';
import {writeFile} from 'fs';
import {FileWatcherResult, Options} from './model/model';
import {error, info, logo} from './utils/log';

export function createWatcherObs(markdownPath: string): Observable<FileWatcherResult> {
  const watcher: FSWatcher = watch(markdownPath, {
    interval: 200,
    alwaysStat: true,
  });
  return new Observable<FileWatcherResult>((obs) => {
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
  });
}

export function runMarkdownFsWatcher(options: Options | any, context: BuilderContext) {

  logo();
  const logger = context.logger;
  const markdownPath = join(normalize(context.workspaceRoot), options.path);
  const outputPath = join(normalize(context.workspaceRoot), '/data.json');
  // console.log('>>>>>>>> options', options);

  return createWatcherObs(markdownPath).pipe(
      tap(result => {
        const msg = `File ${result.eventName} :: ${result.path}`;
        info(msg);
      }),
      switchMap(
          () => findPathMarkdownFilesObs(markdownPath).pipe(
              /* TODO : refactoring */
              mergeMap((fileInfo) =>
                  from(fileInfo).pipe(
                      mergeMap((metadata) => readMarkdownFileObs(metadata)),
                  )
              ),
              scan((fileInfo, cur,) => [...fileInfo, cur], [])
          )
      ),
      debounceTime(1000),
      tap(_ =>
          writeFile(outputPath, JSON.stringify(_, null, 2), ( (err:Error) => {
            if(err){
              error(err)
            }else {
              info(`Output JSON ${outputPath}`)
            }
          }))
      ),
      catchError((err) => of(err)),
      map((result) => {
        if (result instanceof Error) {
          logger.error(result.message);
        }
        return {success: true};
      }),
  );
}


export default createBuilder<Record<string, string> & any>(runMarkdownFsWatcher);
