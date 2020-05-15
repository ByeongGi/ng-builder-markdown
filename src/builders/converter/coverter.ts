import remark from 'remark';
import highlightJs from 'remark-highlight.js';
import remarkHTML from 'remark-html';
import recommendedLint from 'remark-preset-lint-recommended';


export function markdownToHTML(content: string) {
  const {contents} = remark()
      .use(recommendedLint)
      .use(highlightJs)
      .use(remarkHTML)
      .processSync(content);
  return contents;
}

module.exports = {
  markdownToHTML
};
