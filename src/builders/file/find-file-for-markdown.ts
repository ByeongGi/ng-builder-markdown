import {Glob, IGlob} from 'glob';
import {basename} from 'path';
import {Observable} from 'rxjs';
import {MarkDownFileInfo, MarkDownFileInfoList} from '../model/model';

/**
 *
 * @param path
 */
export function findFileForMarkdown(
    path: string
): Observable<MarkDownFileInfoList> {
  const markdownFilePattern = '**/*.md';
  const globConfig = {cwd: path, absolute: true};
  return new Observable<MarkDownFileInfoList>((subscriber) => {
    const g: IGlob = new Glob(markdownFilePattern, globConfig, (err, matches) => {
      if (err) {
        subscriber.error(err);
        g.abort();
        subscriber.complete();
      } else {
        if (matches) {
          const markDownFilelist: MarkDownFileInfoList = matches.map<MarkDownFileInfo>((filePath) => ({
            path: filePath,
            name: basename(filePath),
          }));
          subscriber.next(markDownFilelist);
          g.abort();
          subscriber.complete();
        }
      }
    });
    return () => {
      g.abort();
      subscriber.complete();
    };
  });
}
