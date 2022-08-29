import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import { LoyaltyDiscountModel } from "./loyalty-discount.model";
import { LoyaltyService } from "./loyalty.service";
import { LoyaltyDiscountInput } from "./loyalty-discount.dto";
import { LoyaltyCustomerModel } from "./loyalty-customer.model";
import { LoyaltyCustomerInput } from "./loyalty-customer.dto";

@Resolver()
export class LoyaltyResolver {
    constructor(
        private loyaltyService: LoyaltyService,
    ) { }
    @Mutation(() => LoyaltyDiscountModel)
    async createDiscount(
        @Args('loyaltyDiscountInput') loyaltyDiscountInput: LoyaltyDiscountInput,
    ): Promise<LoyaltyDiscountModel> {
        return await this.loyaltyService.createDiscount(loyaltyDiscountInput)
    }
    @Query(() => [LoyaltyDiscountModel])
    async discounts(): Promise<LoyaltyDiscountModel[]> {
        return await this.loyaltyService.getAllDiscounts();
    }
    @Mutation(() => LoyaltyDiscountModel)
    async addDiscountToCustomer(
        @Args('loyaltyCustomerInput') loyaltyCustomerInput: LoyaltyCustomerInput,
    ): Promise<LoyaltyCustomerModel> {
        return await this.loyaltyService.addDiscountToCustomer(loyaltyCustomerInput)
    }
    @Query(() => LoyaltyCustomerModel)
    async customerDiscount(
        @Args('customerId') customerId: number,
    ): Promise<LoyaltyCustomerModel> {
        return await this.loyaltyService.getCustomerDiscount(customerId);
    }
}
