import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export interface MessageContent {
  text: string;
  adminRead: boolean;
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "bigint", unique: true })
  chatId: string = "";

  @Column({ type: "json" })
  messages:MessageContent[] = [];

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
