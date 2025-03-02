import {FormulaElement} from '@/custom-types';
import {IS_MAC} from '@/shared/utils';
import clsx from 'clsx';
import React, {FC, Fragment, HTMLAttributes, PropsWithChildren} from 'react';
import {useFocused, useSelected} from 'slate-react';

type Props = {
  attributes: HTMLAttributes<HTMLSpanElement>;
  element: FormulaElement;
};

const Formula: FC<Props & PropsWithChildren> = ({
  attributes,
  children,
  element,
}) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <span
      className={clsx(
        'p-1 mx-px inline-block rounded text-[12px] bg-slate-500',
        {
          'font-bold': element.children[0].bold,
          italic: element.children[0].italic,
          'border border-slate-700': selected || focused,
        },
      )}
      {...attributes}
      contentEditable={false}
      data-cy={`formula-${element.name.replace(' ', '-')}`}>
      <div className='text-slate-300' contentEditable={false}>
        {IS_MAC ? (
          <Fragment>
            {children}
            {element.name}
          </Fragment>
        ) : (
          <Fragment>
            {element.name}
            {children}
          </Fragment>
        )}
      </div>
    </span>
  );
};

export default Formula;
