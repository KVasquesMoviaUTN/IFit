import { Response } from 'express';
import { create } from 'xmlbuilder2';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Controller, Get, Res } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';

@Controller()
export class SitemapController {
	constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Get('sitemap.xml')
  async generateSitemap(@Res() res: Response) {
		const products = await this.productRepository.find();

    const urls = [
      { loc: 'https://modofit.shop/' },
			{ loc: 'https://modofit.shop/home' },
			{ loc: 'https://modofit.shop/cart' },
			{ loc: 'https://modofit.shop/login' },
      { loc: 'https://modofit.shop/about' },
      { loc: 'https://modofit.shop/thanks' },
      { loc: 'https://modofit.shop/catalog' },
      { loc: 'https://modofit.shop/contact' },
      { loc: 'https://modofit.shop/register' },
			{ loc: 'https://modofit.shop/mercado-pago' },
			...products.map(product => ({ loc: `https://modofit.shop/products/${product.id}` })),
    ];

    const xmlBuilder = create({ version: '1.0' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

    urls.forEach(urlObj => {
      xmlBuilder.ele('url')
        .ele('loc')
        .txt(urlObj.loc)
        .up()
        .up();
    });

    const xml = xmlBuilder.end({ prettyPrint: true });

    res.setHeader('Content-Type', 'application/xml');
    res.send(xml);
  }
}
