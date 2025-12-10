import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { SaleDetail } from '../../sales/entities/sale-detail.entity';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Presentation {
	@PrimaryGeneratedColumn()
  id: number;
	
  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  flavour: string;

  @Column()
  description: string;

  @Column()
  display: boolean;

  @Column({nullable: true})
  image: string;

  @Column('decimal')
  stock: number;

  @Column()
  informacion_nutricional: string;

	@ManyToOne(() => Product, (product) => product.presentation, { nullable: true })
  @JoinColumn({ name: 'product' })
  product: Product;

    @OneToMany(() => ProductImage, (productImage) => productImage.presentation)
  images: ProductImage[];
}
