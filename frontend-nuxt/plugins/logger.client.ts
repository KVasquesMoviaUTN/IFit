export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const authStore = useAuthStore();

  // Track page views
  router.afterEach((to) => {
    AnalyticsService.track('PAGE_VIEW', {
      path: to.path,
      name: to.name,
      userId: authStore.user?.id
    });
  });

  // Global Error Handler
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    AnalyticsService.track('ERROR', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      info,
      path: router.currentRoute.value.fullPath,
      userId: authStore.user?.id,
      timestamp: new Date().toISOString()
    });
    console.error('Global Error Handler:', error, info);
  };

  // Expose a logger for manual events
  return {
    provide: {
      logEvent: (action: string, metadata: any = {}) => {
        AnalyticsService.track(action, {
          ...metadata,
          userId: authStore.user?.id,
          timestamp: new Date().toISOString()
        });
      }
    }
  };
});
