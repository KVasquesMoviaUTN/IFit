import { Injectable } from '@nestjs/common';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

@Injectable()
export class SitemapService {
  async generateSitemap(baseUrl: string, routes: Array<{ url: string, lastmod?: string, changefreq?: string, priority?: number }>) {
    try {
      const stream = new SitemapStream({ hostname: baseUrl });
      
      const sitemapEntries = routes.map(route => ({
        url: route.url,
        changefreq: route.changefreq || 'daily',
        priority: route.priority || 0.8,
        lastmod: route.lastmod || new Date().toISOString(),
      }));

      const data = await streamToPromise(
        Readable.from(sitemapEntries).pipe(stream)
      );

      return data.toString();
    } catch (error) {
      console.error('Error generando sitemap:', error);
      throw error;
    }
  }
}