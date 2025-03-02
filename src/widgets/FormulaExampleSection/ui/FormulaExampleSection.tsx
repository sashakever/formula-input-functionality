'use client';

import {useStore} from '@/base/store';
import {Portal} from '@/shared/ui';
import {getFlatNodesFromFirstParagraph} from '@/shared/utils';
import clsx from 'clsx';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Editor, Range, Transforms, createEditor} from 'slate';
import {withHistory} from 'slate-history';
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  withReact,
} from 'slate-react';

import {FORMULA_VALUES, initialValue} from '../constants';
import useAutocompleteItems from '../hooks/useAutocompleteItems';
import {Element} from './Element';
import {withFormulas} from './FormulaHOC';

const insertFormulaItem = (
  editor: Editor,
  name: string,
  category: string,
  value: number | string,
) => {
  const formula = {
    type: 'formula',
    name,
    category,
    value,
    children: [{text: ''}],
  };
  // TODO: fix this
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Transforms.insertNodes(editor, formula);
  Transforms.move(editor);
};

const FormulaExampleSection: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<Range | undefined | null>(null);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );
  const editor = useMemo(
    () => withFormulas(withReact(withHistory(createEditor()))),
    [],
  );
  const {updateTokens} = useStore();
  const {data} = useAutocompleteItems();

  const formulaItems = (data || FORMULA_VALUES)
    .filter((c) => c.name.toLowerCase().startsWith(search?.toLowerCase()))
    .slice(0, 10);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (target && formulaItems.length > 0) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= formulaItems.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? formulaItems.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            insertFormulaItem(
              editor,
              formulaItems[index].name,
              formulaItems[index].category,
              formulaItems[index].value,
            );
            setTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [formulaItems, editor, index, target],
  );

  useEffect(() => {
    if (target && formulaItems.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [formulaItems.length, editor, index, search, target]);

  const handleChange = () => {
    const {selection} = editor;
    updateTokens(
      getFlatNodesFromFirstParagraph(editor).map((node) =>
        // TODO: fix this
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        node?.type === 'formula' ? node.value : node?.text || '',
      ),
    );

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, {unit: 'word'});
      console.log('wordBefore', wordBefore);
      const before = wordBefore && Editor.before(editor, wordBefore);
      console.log('before', before);
      const beforeRange = before && Editor.range(editor, before, start);
      console.log('beforeRange', beforeRange);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      console.log('beforeText', beforeText);
      const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && afterMatch) {
        setTarget(beforeRange);
        setSearch(beforeMatch[1]);
        setIndex(0);
        return;
      }
    }

    setTarget(null);
  };

  return (
    <div className='flex flex-col gap-1'>
      <h1 className='text-xl font-bold'>
        Formula Input (type @ and then formula name to insert formula)
      </h1>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={handleChange}>
        <Editable
          renderElement={renderElement}
          onKeyDown={onKeyDown}
          placeholder='Enter some text...'
        />
        {target && formulaItems.length > 0 && (
          <Portal>
            <div
              ref={ref}
              className='top-[-9999px] left-[-9999px] absolute z-10 p-1 bg-slate-600 rounded shadow-md'
              data-cy='formulas-portal'>
              {formulaItems.map((item, i) => (
                <div
                  key={item.id}
                  className={clsx(
                    'text-slate-100 p-1 rounded cursor-pointer',
                    'hover:bg-slate-700',
                    {'bg-slate-400': i === index},
                  )}
                  onClick={() => {
                    Transforms.select(editor, target);
                    insertFormulaItem(
                      editor,
                      item.name,
                      item.category,
                      item.value,
                    );
                    setTarget(null);
                  }}>
                  <p className='text-[18px] mb-0.5'>{item.name}</p>
                  <p className='text-[12px] text-slate-300'>{item.category}</p>
                </div>
              ))}
            </div>
          </Portal>
        )}
      </Slate>
    </div>
  );
};

export default FormulaExampleSection;
