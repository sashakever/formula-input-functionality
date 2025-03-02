import {Editor} from 'slate';

const withFormulas = (editor: Editor) => {
  const {isInline, isVoid, markableVoid} = editor;

  editor.isInline = (element) => {
    return element.type === 'formula' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'formula' ? true : isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.type === 'formula' || markableVoid(element);
  };

  return editor;
};

export default withFormulas;
