import {Glob, IGlob} from 'glob';
import {basename} from 'path';
import {Observable} from 'rxjs';
import {MarkDownFileInfo, MarkDownFileInfoList} from '../model/model';

/**
 *
 * @param path
 */
export const findFileForMarkdown = (path: string): Observable<MarkDownFileInfoList> => {
  const markdownFilePattern = '**/*.md';
  const globConfig = {cwd: path, absolute: true};
  return new Observable<MarkDownFileInfoList>((subscriber) => {
    const g: IGlob = new Glob(markdownFilePattern, globConfig, (err, matches) => {
      if (err) {
        g.abort();
        subscriber.error(err);
        subscriber.complete();
      } else {
        if (matches) {
          const markdownFileList: MarkDownFileInfoList = matches.map<MarkDownFileInfo>((filePath) => ({
            path: filePath,
            name: basename(filePath),
          }));
          g.abort();
          subscriber.next(markdownFileList);
          subscriber.complete();
        }
      }
    });
    return () => {
      g.abort();
    };
  });
};
