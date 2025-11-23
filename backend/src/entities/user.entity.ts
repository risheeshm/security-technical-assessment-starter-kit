import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Listing } from '../listings/entities/listing.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: string;

    @OneToMany(() => Listing, (listing) => listing.owner)
    listings: Listing[];
}
