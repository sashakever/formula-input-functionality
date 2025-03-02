import {create} from 'zustand/index';

type TokenStore = {
  tokens: string[];
  updateTokens: (tokens: string[]) => void;
};

const useStore = create<TokenStore>((set) => ({
  tokens: ['2', '+', '3'],
  updateTokens: (tokens: string[]) => set(() => ({tokens})),
}));

export {useStore};
