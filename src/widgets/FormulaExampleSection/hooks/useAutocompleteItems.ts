import {FormulaElement} from '@/custom-types';
import {useQuery} from 'react-query';

type AutocompleteItem = Omit<FormulaElement, 'type' | 'children'> & {id: string};

const url = 'https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete';

const fetchAutocomplete = async (): Promise<AutocompleteItem[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching autocomplete items');
  }
  return response.json();
};

const useAutocompleteItems = () => {
  const {data, error, isLoading} = useQuery<AutocompleteItem[]>(
    'autocomplete',
    fetchAutocomplete,
  );

  return {data, error, isLoading};
};

export default useAutocompleteItems;
