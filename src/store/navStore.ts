import { create } from 'zustand';

interface NavState {
  activeClusterId: string;
  openMenuId: string | null;
  aiPanelOpen: boolean;
  leftSidebarWidth: number;
  leftSidebarCollapsed: boolean;
  rightSidebarWidth: number;
  dockMagnification: number;
  setActiveCluster: (id: string) => void;
  setOpenMenuId: (id: string | null) => void;
  toggleMenu: (id: string) => void;
  toggleAiPanel: () => void;
  setAiPanel: (open: boolean) => void;
  setLeftSidebarWidth: (w: number) => void;
  setLeftSidebarCollapsed: (v: boolean) => void;
  setRightSidebarWidth: (w: number) => void;
  setDockMagnification: (n: number) => void;
}

export const useNavStore = create<NavState>((set) => ({
  activeClusterId: 'home',
  openMenuId: null,
  aiPanelOpen: true,
  leftSidebarWidth: 240,
  leftSidebarCollapsed: false,
  rightSidebarWidth: 320,
  dockMagnification: 56,
  setActiveCluster:        (id) => set({ activeClusterId: id }),
  setOpenMenuId:           (id) => set({ openMenuId: id }),
  toggleMenu:              (id) => set((s) => ({ openMenuId: s.openMenuId === id ? null : id })),
  toggleAiPanel:           () => set((s) => ({ aiPanelOpen: !s.aiPanelOpen })),
  setAiPanel:              (open) => set({ aiPanelOpen: open }),
  setLeftSidebarWidth:     (w) => set({ leftSidebarWidth: w }),
  setLeftSidebarCollapsed: (v) => set({ leftSidebarCollapsed: v }),
  setRightSidebarWidth:    (w) => set({ rightSidebarWidth: w }),
  setDockMagnification:    (n) => set({ dockMagnification: n }),
}));
