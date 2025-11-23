import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../entities/user.entity';

@Entity()
export class Listing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('decimal')
    price: number;

    @Column()
    address: string;

    @Column()
    type: string; // sale or rent

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    sqft: number;

    @Column({ nullable: true })
    imageUrl: string;

    @ManyToOne(() => User, (user) => user.listings)
    owner: User;
}
