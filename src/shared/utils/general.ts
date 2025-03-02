import {Descendant, Editor, Element} from 'slate';

type ParagraphElement = Element & {
  type: 'paragraph';
  children: Descendant & {type: string} & {value: number; text: string}[];
};

export const getFlatNodesFromFirstParagraph = (
  editor: Editor,
): Descendant[] => {
  const paragraphNode = editor.children.find(
    (node): node is ParagraphElement =>
      Element.isElement(node) && node.type === 'paragraph',
  );

  return paragraphNode ? paragraphNode.children : [];
};
