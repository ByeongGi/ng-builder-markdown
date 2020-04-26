import {basename} from 'path';
import {Glob, IGlob} from 'glob';
import matter from 'gray-matter';
import {readFile} from 'fs';
import {MarkDownFileInfo, MarkDownFileInfoList, MarkdownMetaInfo} from '../model/model';
import {VFile} from 'vfile';
import remark from 'remark';
// @ts-ignore
import recommendedLint from 'remark-preset-lint-recommended';
// @ts-ignore
import remarkHTML from 'remark-html';
// @ts-ignore
import highlightJs from 'remark-highlight.js';
import {Observable} from 'rxjs';

export function findPathMarkdownFilesObs(path: string): Observable<MarkDownFileInfoList> {
  const markdownExtension = '**/*.md';
  return new Observable<MarkDownFileInfoList>((obs) => {
    const g: IGlob = new Glob(markdownExtension, {
      cwd: path,
      absolute: true,
    }, (err, matches) => {
      if (err) {
        obs.error(err);
        g.abort();
        obs.complete();
      } else {
        if (matches) {
          const markDownFiles: MarkDownFileInfoList = matches.map<MarkDownFileInfo>((filePath) => ({
            filePath: filePath,
            fileName: basename(filePath)
          }));
          obs.next(markDownFiles);
          g.abort();
          obs.complete();
        }
      }
    });
    return () => {
      obs.complete();
    };
  });
}

export function readMarkdownFileObs({fileName, filePath}: MarkDownFileInfo): Observable<MarkdownMetaInfo> {
  return new Observable<MarkdownMetaInfo>((obs) => {
    readFile(filePath, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else {
        try {
          /* TODO : refactoring 파일을 읽는 부분과 변환 하는 부분을 분리해야 할 것 같다.*/
          const markdownMetaInfo = matter(data);
          const {contents} = markdownToHTML(markdownMetaInfo.content);
          obs.next({
            data : markdownMetaInfo.data,
            content: markdownMetaInfo.content,
            fileName: fileName,
            filePath: filePath,
            html: contents.toString()
          });
        } catch (e) {
          obs.error(e);
          obs.complete();
        }

      }
    });
    return () => {
      obs.complete();
    };
  });
}

export function markdownToHTML(content: string): VFile {
  return remark()
      .use(recommendedLint)
      .use(highlightJs)
      .use(remarkHTML)
      .processSync(content);
}

