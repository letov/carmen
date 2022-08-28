import { PrimaryGeneratedColumn, Entity, Column } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Customer {
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
}
