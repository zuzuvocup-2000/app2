import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Queue1{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    website: string;
}