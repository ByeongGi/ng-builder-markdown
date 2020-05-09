import { sync } from "glob";
import { basename } from "path";
import { Observable } from "rxjs";
import { MarkDownFileInfo, MarkDownFileInfoList } from "../model/model";

/**
 *
 * @param path
 */
export const findFileForMarkdown = (
  path: string
): Observable<MarkDownFileInfoList> => {
  const markdownFilePattern = "**/*.md";
  const globConfig = { cwd: path, absolute: true };
  return new Observable<MarkDownFileInfoList>((subscriber) => {
    const markdownFileList = sync(markdownFilePattern, globConfig);
    subscriber.next(
      <MarkDownFileInfoList>markdownFileList.map<MarkDownFileInfo>(
        (filePath) => ({
          path: filePath,
          name: basename(filePath),
        })
      )
    );
    subscriber.complete();
  });
};
