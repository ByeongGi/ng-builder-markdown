import {Stats} from 'fs';
import {JsonObject} from '@angular-devkit/core';

export interface MarkdownMetaInfo {
  data: { [key: string]: any }
  content: string
  filePath: string;
  fileName: string;
  html: string;
}

export interface MarkDownFileInfo {
  filePath: string;
  fileName: string;
}


export type MarkDownFileInfoList = MarkDownFileInfo[];
export type MarkdownMetaInfoList = MarkdownMetaInfo[];

export interface Options extends JsonObject {
  path: string;
}

export interface FileWatcherResult {
  eventName: string | 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';
  path: string;
  details: Stats | undefined;
}
