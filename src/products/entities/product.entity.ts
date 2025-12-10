import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { SaleDetail } from '../../sales/entities/sale-detail.entity';
import { Presentation } from './presentation.entity';
import { ProductImage } from './product-image.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string = '';

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number = 0;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  purchase_price: number = 0;

  @Column({ default: '' })
  description: string = '';

  @Column({ default: false })
  display: boolean = false;

  @Column({ nullable: true, default: '' })
  image: string = '';

  @Column('decimal', { default: 0 })
  stock: number = 0;

  @Column('decimal', { default: 1 })
  unidad_venta: number = 1;

  @Column({ default: 'u' })
  unidad: string = 'u'; 

  @Column({ default: '' })
  highlight: string = ''; 

  @Column({ default: '' })
  informacion_nutricional: string = ''; 

  @Column({ default: 0 })
  display_order: number = 0;
  
  @Column({ default: 0 })
  discount: number = 0; 
  
  @Column({ default: '' })
  category: string = '';

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.product)
  saleDetail: SaleDetail[]

  @OneToMany(() => Presentation, (presentation) => presentation.product)
  presentation: Presentation[]

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];
}
