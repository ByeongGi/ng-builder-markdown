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
