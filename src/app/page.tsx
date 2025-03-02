import {CalculationResultsSection} from '@/widgets/CalculationResultsSection';
import {FormulaExampleSection} from '@/widgets/FormulaExampleSection';
import React from 'react';

export default function Home() {
  return (
    <div className='p-8 flex flex-col gap-4'>
      <CalculationResultsSection />
      <FormulaExampleSection />
    </div>
  );
}
