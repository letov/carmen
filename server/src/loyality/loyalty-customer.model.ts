import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';
import { LoyaltyDiscountModel } from "./loyalty-discount.model";
import { CustomerModel } from "../customer/customer.model";

@ObjectType()
@Entity('loyalty_customer')
export class LoyaltyCustomerModel {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
    @Field()
    @OneToOne(() => LoyaltyDiscountModel)
    @JoinColumn({ name: 'discount_id' })
    discount: LoyaltyDiscountModel
    @Field()
    @OneToOne(() => CustomerModel)
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerModel
}
