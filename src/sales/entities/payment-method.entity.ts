import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sale } from './sale.entity';

@Entity('payment_method')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

	@OneToMany(() => Sale, (sales) => sales.paymentMethod)
  sales: Sale[];
}
