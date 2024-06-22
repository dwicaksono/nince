import { create } from 'zustand';

type OpenAccount = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenAccount = create<OpenAccount>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => {
    return set({ isOpen: true, id });
  },
  onClose: () => {
    return set({ isOpen: false, id: undefined });
  },
}));
