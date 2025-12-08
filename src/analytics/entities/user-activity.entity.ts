import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/user.entity';

@Entity('user_activity')
export class UserActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  action: string; // e.g., 'PAGE_VIEW', 'ADD_TO_CART'

  @Column({ type: 'json', nullable: true })
  metadata: any; // e.g., { path: '/products', productId: 1 }

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  userAgent: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
