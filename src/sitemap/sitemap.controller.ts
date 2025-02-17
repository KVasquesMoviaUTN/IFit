import { Controller, Get, Header } from '@nestjs/common';
import { SitemapService } from './sitemap.service';

@Controller('sitemap.xml')
export class SitemapController {
  constructor(private readonly sitemapService: SitemapService) {}

  @Get()
  @Header('Content-Type', 'application/xml')
  @Header('Content-Disposition', 'attachment; filename=sitemap.xml')
	async getSitemap() {
		const isProduction = process.env.NODE_ENV === 'production';
		const baseUrl = isProduction ? 'https://modofit.shop' : 'http://localhost:8080';
    
    const routes = [	
      { url: '/', priority: 1.0 },
      { url: '/about', priority: 0.8 },
      { url: '/products', priority: 0.9 },
    ];

    return await this.sitemapService.generateSitemap(baseUrl, routes);
  }
}