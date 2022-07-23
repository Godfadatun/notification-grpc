import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  phone_number: string;

  @Column('jsonb')
  settings: {
    notificationsEnabled: boolean;
  };

  @Column('timestamp with time zone')
  createdAt: Date;

  @Column('timestamp with time zone')
  updatedAt: Date;
}
