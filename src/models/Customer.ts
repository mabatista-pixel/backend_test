import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Measure } from './Measure';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    customer_code: string;

    @Column()
    name: string;

    @OneToMany(() => Measure, measure => measure.customer)
    measures: Measure[];
}
