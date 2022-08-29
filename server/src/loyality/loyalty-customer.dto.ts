import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsPositive } from "class-validator";

@InputType()
export class LoyaltyCustomerInput {
    @Field()
    @IsInt()
    @IsPositive()
    discountId: number;
    @Field()
    @IsInt()
    @IsPositive()
    customerId: number;
}
