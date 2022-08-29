import { Module } from '@nestjs/common';
import { LoyaltyService } from "./loyalty.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoyaltyResolver } from "./loyalty.resolver";
import { LoyaltyCustomerModel } from "./loyalty-customer.model";
import { LoyaltyDiscountModel } from "./loyalty-discount.model";
import { CustomerModel } from "../customer/customer.model";

@Module({
    imports: [TypeOrmModule.forFeature([
        LoyaltyCustomerModel,
        LoyaltyDiscountModel,
        CustomerModel
    ])],
    providers: [LoyaltyService, LoyaltyResolver],
})
export class LoyaltyModule {}
