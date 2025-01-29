import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { SaleDetail } from 'src/sales/entities/sale-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column()
  serial: string;

  @Column({nullable: true})
  image: string;

  @Column('decimal')
  stock: number;

  @Column('decimal')
  unidad_venta: number;

  @Column()
  unidad: string; 

  @Column()
  purchase_price: number; 
  
  @ManyToOne(() => Category, (category) => category.products, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale)
  saleDetail: SaleDetail[]
}
