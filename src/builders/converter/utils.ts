import {basename} from 'path';
import {Glob, IGlob} from 'glob';
import matter from 'gray-matter';
import {access, mkdir, readFile} from 'fs';
import {MarkDownFileInfo, MarkDownFileInfoList, MarkdownMetaInfo} from './model/model';
import {VFile} from 'vfile';
import remark from 'remark';
// @ts-ignore
import recommendedLint from 'remark-preset-lint-recommended';
// @ts-ignore
import remarkHTML from 'remark-html';
// @ts-ignore
import highlightJs from 'remark-highlight.js';
import {v4 as uuidv4} from 'uuid';
import {Observable} from 'rxjs';

export function findPathMarkdownFiles(path: string): Observable<MarkDownFileInfoList> {
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

export function readMarkdownFile({fileName, filePath}: MarkDownFileInfo): Observable<MarkdownMetaInfo> {
  console.log('filePath<<<<<',filePath);
  return new Observable<MarkdownMetaInfo>((obs) => {
    readFile(filePath, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        obs.error(err);
        obs.complete();
      } else {
        try {
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

export function makeDirectory(path: string): Promise<boolean> {
  return new Promise((resolve, rejects) => {
    access(path, err => {
      if (err) {
        mkdir(path, {recursive: true}, (err) => {
          if (err) {
            console.log('Not create cache directory');
            rejects(new Error('Not create cache directory'));
          } else {
            resolve(true);
          }
        });
      } else {
        console.log('Exist cache directory');
        resolve(true);
      }
    });
  });
}

export function getUUId() {
  return uuidv4().replace(/-/g, '');
}
