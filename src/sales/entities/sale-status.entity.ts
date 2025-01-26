import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sale } from './sale.entity';

@Entity('sale_status')
export class SaleStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

	@OneToMany(() => Sale, (sales) => sales.saleStatus)
  sales: Sale[];
}
