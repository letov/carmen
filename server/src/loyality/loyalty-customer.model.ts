import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';
import { LoyaltyDiscount } from "./loyalty-discount.model";
import { Customer } from "../customer/customer.model";

@ObjectType()
@Entity()
export class LoyaltyCustomer {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
    @Field()
    @OneToOne(() => LoyaltyDiscount)
    @JoinColumn()
    discount: LoyaltyDiscount
    @Field()
    @OneToOne(() => Customer)
    @JoinColumn()
    customer: Customer
}
