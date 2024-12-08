import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "bigint", unique: true })
  chatId: string = "";

  @Column({ unique: true })
  username: string = "";

  @Column({ type: "boolean", default: false })
  isAdmin: boolean = false;

  @Column({ type: "boolean", default: false })
  isEndStart: boolean = false;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
