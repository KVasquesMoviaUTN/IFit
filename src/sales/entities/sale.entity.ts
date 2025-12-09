import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/user.entity';
import { SaleStatus } from '../enums/sale-status.enum';
import { SaleDetail } from './sale-detail.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

	@Column('decimal', { precision: 10, scale: 2 })
	total: number;

  @Column()
	shipping: number;

  @Column({ default: false })
  known_client: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.sales, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  paymentMethod: string;

  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.PENDING
  })
  saleStatus: SaleStatus;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale)
  saleDetail: SaleDetail[]
}
