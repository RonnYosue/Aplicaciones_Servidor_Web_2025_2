import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from 'src/rol/entities/rol.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Rol, (rol) => rol.users, { eager: false })
<<<<<<< HEAD
  @JoinColumn({ name: 'rolId' })
=======
  @JoinColumn({ name: 'id' })
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  rol: Rol;
}
