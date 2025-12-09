import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Sale } from './sale.entity';
import { Presentation } from '../../products/entities/presentation.entity';

@Entity('sale_details')
export class SaleDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.saleDetail)
  @JoinColumn({ name: 'product_id' })
  product: Product;

	@Column()
	quantity: number;

	@Column('decimal', { precision: 10, scale: 2 })
	subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  unit_price: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount: number;

  @ManyToOne(() => Sale, (sale) => sale.saleDetail)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Presentation, { nullable: true })
  @JoinColumn({ name: 'presentation_id' })
  presentation: Presentation;
}
