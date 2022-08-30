import { Module } from '@nestjs/common';
import { LoyaltyService } from "./loyalty.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoyaltyResolver } from "./loyalty.resolver";
import { LoyaltyCustomer } from "./loyalty-customer.model";
import { LoyaltyDiscount } from "./loyalty-discount.model";
import { Customer } from "../customer/customer.model";

@Module({
    imports: [TypeOrmModule.forFeature([
        LoyaltyCustomer,
        LoyaltyDiscount,
        Customer
    ])],
    providers: [LoyaltyService, LoyaltyResolver],
})
export class LoyaltyModule {}
