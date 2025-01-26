import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Sale } from './sale.entity';

@Entity('sale_details')
export class SaleDetail {
  @PrimaryGeneratedColumn()
  id: number;

	@OneToMany(() => Product, (product) => product.category)
  products: Product[];

	@Column()
	quantity: number;

	@Column()
	unit_price: number;

  @ManyToOne(() => Sale, (sale) => sale.saleDetail, { nullable: true })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}
