import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    initializeAuth() {
      if (process.client) {
        try {
          const storedUser = localStorage.getItem('user');
          if (storedUser && storedUser !== 'undefined') {
            this.user = JSON.parse(storedUser);
          }
          this.token = localStorage.getItem('token') || null;
        } catch (e) {
          console.error('Error parsing user from localStorage', e);
          localStorage.removeItem('user');
        }
      }
    },
    async login(email, password) {
      try {
        const config = useRuntimeConfig();
        const response: any = await $fetch(`${config.public.apiBase}/auth/login`, {
          method: 'POST',
          body: { mail: email, password }
        });
        
        this.token = response.token;
        this.user = response.user;
        
        if (process.client) {
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },
});
