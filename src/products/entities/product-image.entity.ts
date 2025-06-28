import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Presentation } from './presentation.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_url' })
  image_url: string;

  @Column({ name: 'alt_text', nullable: true })
  alt_text?: string;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  display_order: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

    @ManyToOne(() => Presentation, presentation => presentation.images, { nullable: true })
    @JoinColumn({ name: 'presentation_id' })
  presentation?: Presentation;
}
