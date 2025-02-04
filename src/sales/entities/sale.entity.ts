import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/users/user.entity';
import { PaymentMethod } from './payment-method.entity';
import { SaleStatus } from './sale-status.entity';
import { SaleDetail } from './sale-detail.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

	@Column('decimal', { precision: 10, scale: 2 })
	total: number;

  @Column()
	shipping: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

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
