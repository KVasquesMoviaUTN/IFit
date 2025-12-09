import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Users } from '../users/user.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../products/entities/category.entity';
import { SaleDetail } from '../sales/entities/sale-detail.entity';
import { Presentation } from '../products/entities/presentation.entity';
import { ProductImage } from '../products/entities/product-image.entity';
import { ProductPriceHistory } from '../products/entities/product-price-history.entity';
import { UserActivity } from '../analytics/entities/user-activity.entity';
import { Shift } from '../shifts/entities/shift.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://kalil:fattyshady@localhost:5432/IFit',
  entities: [
    Users,
    Sale,
    Product,
    Category,
    SaleDetail,
    Presentation,
    ProductImage,
    ProductPriceHistory,
    UserActivity,
    Shift,
  ],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Always false for migrations
});
