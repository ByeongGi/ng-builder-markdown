declare module 'remark-preset-lint-recommended' {
  import {PluggableList} from 'unified';
  export = {plugins: PluggableList};
}
declare module 'remark-html';

declare module 'remark-highlight.js' {
  export default function attacher({include, exclude, prefix} = {}): void {}
}
