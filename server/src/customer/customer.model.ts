import { PrimaryGeneratedColumn, Entity, Column } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';

export interface ICustomer {
    id: number;
    name: string;
    phone: string;
    image: string;
}

@ObjectType()
@Entity()
export class Customer implements ICustomer {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
    @Field()
    @Column({
        length: 50,
    })
    name: string;
    @Field()
    @Column({
        length: 50,
        unique: true,
    })
    phone: string;
    @Field({ nullable: true })
    @Column({
        nullable: true,
    })
    image: string;
}
