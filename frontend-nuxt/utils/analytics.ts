export const AnalyticsService = {
  async track(action: string, metadata: any = {}) {
    try {
      const config = useRuntimeConfig();
      await $fetch(`${config.public.apiBase}/analytics/track`, {
        method: 'POST',
        body: {
          action,
          metadata
        }
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }
};
