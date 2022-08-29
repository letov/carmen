import { PrimaryGeneratedColumn, Entity, Column } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity('loyalty_discount')
export class LoyaltyDiscountModel {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
    @Field()
    @Column({ name: "meet_count", unique: true })
    meetCount: number;
    @Field()
    @Column()
    discount: number;
}
