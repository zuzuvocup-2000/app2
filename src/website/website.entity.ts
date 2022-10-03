import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Website{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    website: string;

    @Column()
    status: number;
}