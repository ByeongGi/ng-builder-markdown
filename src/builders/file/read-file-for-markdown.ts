import matter from 'gray-matter';
import {readFile} from 'fs';
import {MarkdownFile, MarkDownFileInfo} from '../model/model';
import {Observable} from 'rxjs';

/**
 *
 * @param MarkDownFileInfo
 */
export function readFileForMarkdown({name, path}: MarkDownFileInfo) {
  return new Observable<MarkdownFile>((subscriber) => {
    readFile(path, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        subscriber.error(err);
        subscriber.complete();
      } else {
        try {
          const markdownFile = matter(data);
          subscriber.next({
            data: markdownFile.data,
            content: markdownFile.content,
            name: name,
            path: path,
          });
        } catch (e) {
          subscriber.error(e);
          subscriber.complete();
        }
      }
    });
    return () => {
      subscriber.complete();
    };
  });
}
