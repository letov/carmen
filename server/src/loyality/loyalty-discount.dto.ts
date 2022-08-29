import { Field, InputType } from "@nestjs/graphql";
import { IsInt, Max, Min } from "class-validator";

@InputType()
export class LoyaltyDiscountInput {
    @Field()
    @IsInt()
    @Min(1)
    @Max(100)
    meetCount: number;
    @Field()
    @IsInt()
    @Min(1)
    @Max(100)
    discount: number;
 }
