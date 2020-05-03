import {Stats} from 'fs';
import {JsonObject} from '@angular-devkit/core';
import {BuilderOutput} from '@angular-devkit/architect';


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
  input: string | null;
  output: {
    path: string | null;
    name: string;
    hash: boolean;
  },
  converter: {
    transform: string | null;
  }
}

export type MarkdownConvertBuilderResult = BuilderOutput;

export interface FileWatcherResult {
  eventName: string | 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';
  path: string;
  details: Stats | undefined;
}
