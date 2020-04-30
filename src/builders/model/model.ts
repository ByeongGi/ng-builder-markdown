import {Stats} from 'fs';
import {JsonObject} from '@angular-devkit/core';


export interface MarkDownFileInfo {
  path: string;
  name: string;
}

export interface MarkdownFile {
  data: { [key: string]: any }
  content: string
  path: string;
  name: string;
}


export type MarkDownFileInfoList = MarkDownFileInfo[];
export type MarkdownFileList = MarkdownFile[];

export interface Options extends JsonObject {
  path: string;
}

export interface FileWatcherResult {
  eventName: string | 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';
  path: string;
  details: Stats | undefined;
}
