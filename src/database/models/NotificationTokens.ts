import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotificationTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 13 })
  user_mobile: string;

  @Column('text')
  fcm_token: string;

  @Column('jsonb')
  device_info: { deviceId: string };

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;
}
