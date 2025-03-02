'use client';

import {useStore} from '@/base/store';
import clsx from 'clsx';
import {evaluate} from 'mathjs';
import {FC, useEffect, useState} from 'react';

const CalculationResultsSection: FC = () => {
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const {tokens} = useStore();

  useEffect(() => {
    try {
      const result = evaluate(tokens.join(''));
      setResult(result);
      setError('');
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [tokens]);

  return (
    <div>
      Calculation results:{' '}
      <span className={clsx('text-base', {'text-red-500': !!error})}>
        {error ? error : result}
      </span>
    </div>
  );
};

export default CalculationResultsSection;
