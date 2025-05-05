import { defineStore } from 'pinia';

interface AppState {
  isMobile: boolean;
  _resizeHandler: (() => void) | undefined;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isMobile: false,
    _resizeHandler: undefined,
  }),

  actions: {
    checkIsMobile(): void {
      // Basic check for mobile devices or small screens
      this.isMobile =
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth <= 768;
    },
    setIsMobile(value: boolean): void {
      this.isMobile = value;
    },
    listenResize(): void {
      // Set initial value
      this.checkIsMobile();
      // Handler for resize event
      this._resizeHandler = () => {
        this.checkIsMobile();
      };
      window.addEventListener('resize', this._resizeHandler);
    },
    removeResizeListener(): void {
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler);
        this._resizeHandler = undefined;
      }
    },
  },
});
