import { create } from 'zustand';

type OpenCategory = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenCategory = create<OpenCategory>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => {
    return set({ isOpen: true, id });
  },
  onClose: () => {
    return set({ isOpen: false, id: undefined });
  },
}));
