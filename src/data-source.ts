import { config } from 'dotenv'
// import { User } from 'mercadopago';
import { DataSource } from "typeorm";
import { Users } from './users/user.entity';
// import { Users } from './users/user.entity';
// import { Sale } from './sales/entities/sale.entity';
// import { Product } from './products/entities/product.entity';
// import { Category } from './products/entities/category.entity';
// import { SaleDetail } from './sales/entities/sale-detail.entity';
// import { SaleStatus } from './sales/entities/sale-status.entity';
// import { Presentation } from './products/entities/presentation.entity';
// import { PaymentMethod } from './sales/entities/payment-method.entity';

config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [
        './src/products/entities/product.entity.ts',
        './src/products/entities/category.entity.ts',
        './src/products/entities/presentation.entity.ts',
        './src/users/user.entity.ts',
        './src/sales/entities/sale.entity.ts',
        './src/sales/entities/sale-detail.entity.ts',
        './src/sales/entities/sale-status.entity.ts',
        './src/sales/entities/payment-method.entity.ts',
    ],
    // entities: [Product, Category, Presentation, Users, Sale, SaleDetail, SaleStatus, PaymentMethod],
    migrations: ["src/migrations/**/*.ts"],
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false
})