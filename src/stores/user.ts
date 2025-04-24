import { defineStore } from 'pinia';

interface UserState {
  displayName: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    displayName: '',
  }),

  actions: {
    setCurrentUserDisplayName(displayName: string): void {
      this.displayName = displayName;
    },
  },

  getters: {
    getCurrentUserLastName: (state): string => {
      const arr = state.displayName.split(' ');
      return arr[arr.length - 1];
    },
  },
});
