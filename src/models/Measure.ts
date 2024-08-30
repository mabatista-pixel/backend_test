import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer';

@Entity()
export class Measure {
    @PrimaryGeneratedColumn('uuid')
    measure_uuid: string;

    @Column()
    measure_datetime: Date;

    @Column()
    measure_type: string;

    @Column()
    measure_value: number;

    @Column({ default: false })
    has_confirmed: boolean;

    @Column()
    image_url: string;

    @ManyToOne(() => Customer, customer => customer.measures)
    customer: Customer;
}
