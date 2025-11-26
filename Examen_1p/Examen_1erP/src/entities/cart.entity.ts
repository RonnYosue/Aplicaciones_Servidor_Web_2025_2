import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';

export type CartStatus = 'active' | 'ordered' | 'cancelled';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true, eager: true })
  items: CartItem[];

  // Optional owner reference (could be anonymous session)
  @Column({ nullable: true })
  userId?: string;

  @Column({ type: 'varchar', length: 32, default: 'active' })
  status: CartStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getTotal(): number {
    if (!this.items) return 0;
    return this.items.reduce((sum, it) => sum + Number(it.product.price) * it.quantity, 0);
  }
}
