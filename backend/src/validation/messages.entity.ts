import { Entity, Column, PrimaryColumn, BeforeUpdate } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryColumn()
  code: number;

  @PrimaryColumn()
  locale: string;

  @Column()
  type: 'alert' | 'confirm' | 'success' | 'error';

  @Column('text')
  message: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
