import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import { LoyaltyDiscount } from "./loyalty-discount.model";
import { LoyaltyService } from "./loyalty.service";
import { LoyaltyDiscountInput } from "./loyalty-discount.dto";
import { LoyaltyCustomer } from "./loyalty-customer.model";
import { LoyaltyCustomerInput } from "./loyalty-customer.dto";

@Resolver()
export class LoyaltyResolver {
    constructor(
        private loyaltyService: LoyaltyService,
    ) { }
    @Mutation(() => LoyaltyDiscount)
    async createDiscount(
        @Args('loyaltyDiscountInput') loyaltyDiscountInput: LoyaltyDiscountInput,
    ): Promise<LoyaltyDiscount> {
        return await this.loyaltyService.createDiscount(loyaltyDiscountInput)
    }
    @Query(() => [LoyaltyDiscount])
    async discounts(): Promise<LoyaltyDiscount[]> {
        return await this.loyaltyService.getAllDiscounts();
    }
    @Mutation(() => LoyaltyDiscount)
    async addDiscountToCustomer(
        @Args('loyaltyCustomerInput') loyaltyCustomerInput: LoyaltyCustomerInput,
    ): Promise<LoyaltyCustomer> {
        return await this.loyaltyService.addDiscountToCustomer(loyaltyCustomerInput)
    }
    @Query(() => LoyaltyCustomer)
    async customerDiscount(
        @Args('customerId') customerId: number,
    ): Promise<LoyaltyCustomer> {
        return await this.loyaltyService.getCustomerDiscount(customerId);
    }
}
