import { PrimaryGeneratedColumn, Entity, Column } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class LoyaltyDiscount {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
    @Field()
    @Column({ unique: true })
    meetCount: number;
    @Field()
    @Column()
    discount: number;
}
