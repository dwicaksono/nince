import { create } from 'zustand';

type OpenDialog = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// refactore or move this to a shared folder
export const useOpenDialog = create<OpenDialog>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
