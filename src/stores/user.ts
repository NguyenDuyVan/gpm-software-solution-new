import type { User } from '@/types/user';
import { defineStore } from 'pinia';

interface UserState {
  user?: User;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: undefined,
  }),

  actions: {
    setCurrentUserDisplayName(displayName: string): void {
      if (this.user) {
        this.user.display_name = displayName;
      }
    },
    setCurrentUser(user: User): void {
      this.user = user;
    },
  },

  getters: {
    getCurrentUserLastName: (state): string => {
      const arr = state.user?.display_name.split(' ');
      return arr?.length ? arr[arr.length - 1] : '';
    },
    getCurrentUser: (state): User | undefined => {
      return state.user;
    },
  },
});
