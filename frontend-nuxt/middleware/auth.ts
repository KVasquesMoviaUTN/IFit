export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login');
  }

  // Check for admin permissions if accessing admin routes
  if (to.path.startsWith('/admin') && authStore.user?.role !== 'admin') {
    return navigateTo('/');
  }
});
