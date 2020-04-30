import {VFile} from 'vfile';
import remark from 'remark';
// @ts-ignore
import recommendedLint from 'remark-preset-lint-recommended';
// @ts-ignore
import remarkHTML from 'remark-html';
// @ts-ignore
import highlightJs from 'remark-highlight.js';

export function markdownToHTML(content: string): VFile {
  return remark()
      .use(recommendedLint)
      .use(highlightJs)
      .use(remarkHTML)
      .processSync(content);
}

