import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { SaleDetail } from 'src/sales/entities/sale-detail.entity';
import { Presentation } from './presentation.entity';

@Entity('products')
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
  display: boolean;

  @Column({nullable: true})
  image: string;

  @Column('decimal')
  stock: number;

  @Column('decimal')
  unidad_venta: number;

  @Column()
  unidad: string; 

  @Column()
  highlight: string; 

  @Column()
  informacion_nutricional: string; 

  @Column()
  display_order: number;
  
  @Column()
  discount: number; 
  
  // @ManyToOne(() => Category, (category) => category.products, { nullable: true })
  // @JoinColumn({ name: 'category' })
  // category: Category;

  @Column()
  category: string;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.product)
  saleDetail: SaleDetail[]

  @OneToMany(() => Presentation, (presentation) => presentation.product)
  presentation: Presentation[]
}
