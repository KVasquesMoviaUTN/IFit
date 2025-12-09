import { Sale } from '../sales/entities/sale.entity';
import { Shift } from '../shifts/entities/shift.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ type: 'jsonb' })
  address: object;

  @Column({ unique: true })
  mail: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[]

  @OneToMany(() => Shift, (shift) => shift.user)
  shifts: Shift[]
}
