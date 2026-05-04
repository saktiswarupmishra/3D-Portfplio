import { create } from 'zustand'

const useStore = create((set) => ({
  // Navigation
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),

  // Loading
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  loadingProgress: 0,
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),

  // Cursor
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),

  // Device
  isMobile: window.innerWidth < 768,
  setIsMobile: (mobile) => set({ isMobile: mobile }),

  // Sound
  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  // Modal
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),

  // Easter egg
  easterEggFound: false,
  setEasterEggFound: (found) => set({ easterEggFound: found }),
}))

export default useStore
