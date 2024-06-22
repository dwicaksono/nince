import { create } from 'zustand';

type OpenTransaction = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenTransaction = create<OpenTransaction>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => {
    return set({ isOpen: true, id });
  },
  onClose: () => {
    return set({ isOpen: false, id: undefined });
  },
}));
