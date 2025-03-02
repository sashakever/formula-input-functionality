import {CustomElement} from '@/custom-types';
import React, {FC, HTMLAttributes, PropsWithChildren} from 'react';

import {Formula} from '../Formula';

type Props = {
  attributes: HTMLAttributes<HTMLSpanElement>;
  element: CustomElement;
};

const Element: FC<Props & PropsWithChildren> = (props) => {
  const {attributes, children, element} = props;

  switch (element.type) {
    case 'formula':
      // TODO: Fix this
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return <Formula {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
