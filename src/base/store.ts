import {create} from 'zustand/index';

type TokenStore = {
  tokens: string[];
  updateTokens: (tokens: string[]) => void;
};

const useStore = create<TokenStore>((set) => ({
  tokens: [],
  updateTokens: (tokens: string[]) => set(() => ({tokens})),
}));

export {useStore};
