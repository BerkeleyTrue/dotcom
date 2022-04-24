import { visit } from 'unist-util-visit';
import type { Parent, Node, Literal } from 'unist';
import { load } from 'js-yaml';
import slug from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const remarkCodeTitles = () => {
  return (tree: Node) =>
    visit(tree, 'code', (node: Node & { lang: string }, index, parent: Parent) => {
      const nodeLang = node.lang || '';
      let language = '';
      let title = '';

      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.search(':'));
        title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length);
      }

      if (!title) {
        return;
      }

      const className = 'remark-code-title';

      const titleNode = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'className', value: className },
        ],
        children: [{ type: 'text', value: title }],
        data: { _xdmExplicitJsx: true },
      };

      parent.children.splice(index, 0, titleNode);
      node.lang = language;
    });
};

export const extractFrontmatter = () => {
  return (tree: Node, file: Node) => {
    visit(tree, 'yaml', (node: Literal<string>) => {
      file.data.frontmatter = load(node.value);
    });
  };
};

export const remarkTocHeadings = (options: { exportRef: any[] }) => {
  return (tree: Node) =>
    visit(tree, 'heading', (node: Node & { depth: any}) => {
      const textContent = toString(node);
      options.exportRef.push({
        value: textContent,
        url: '#' + slug.slug(textContent),
        depth: node.depth,
      });
    });
};

export const createRemarkPlugins = (options: { exportRef: any[] }): any[] => [
  extractFrontmatter,
  [remarkTocHeadings, options],
  remarkGfm,
  remarkCodeTitles,
  remarkMath,
];
