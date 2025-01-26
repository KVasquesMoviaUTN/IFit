import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/users/user.entity';
import { PaymentMethod } from './payment-method.entity';
import { SaleStatus } from './sale-status.entity';
import { SaleDetail } from './sale-detail.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

	@Column()
	quantity: number;

	@Column('decimal', { precision: 10, scale: 2 })
	total: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.sales, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.sales, { nullable: true })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => SaleStatus, (saleStatus) => saleStatus.sales, { nullable: true })
  @JoinColumn({ name: 'sale_status_id' })
  saleStatus: SaleStatus;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale)
  saleDetail: SaleDetail[]
}
