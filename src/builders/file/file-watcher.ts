import {FSWatcher, watch} from 'chokidar';
import {Observable} from 'rxjs';
import {FileWatcherResult} from '../model';

/**
 * Detects change in files in the specified path.
 * @param path
 */
export const fileWatcher = (path: string): Observable<FileWatcherResult> => {
  const defaultOption = {
    interval: 200,
    alwaysStat: true,
  };
  const fsWatcher: FSWatcher = watch(path, defaultOption);
  return new Observable<FileWatcherResult>((subscriber) => {
    fsWatcher.on('all', (eventName, path, details) => {
      subscriber.next({eventName, path, details});
    });
    fsWatcher.on('error', (error) => {
      subscriber.error(error);
    });
    return () => {
      fsWatcher.close();
    };
  });
};
