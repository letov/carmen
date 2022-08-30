import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { LoyaltyDiscount } from "./loyalty-discount.model";
import { LoyaltyCustomer } from "./loyalty-customer.model";
import { Customer } from "../customer/customer.model";
import { LoyaltyDiscountInput } from "./loyalty-discount.dto";
import { LoyaltyCustomerInput } from "./loyalty-customer.dto";

@Injectable()
export class LoyaltyService {
    constructor(
        @InjectRepository(LoyaltyDiscount)
        private loyaltyDiscountRepository: Repository<LoyaltyDiscount>,
        @InjectRepository(LoyaltyCustomer)
        private loyaltyCustomerRepository: Repository<LoyaltyCustomer>,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}
    createDiscount(loyaltyDiscountInput: LoyaltyDiscountInput): Promise<LoyaltyDiscount> {
        return this.loyaltyDiscountRepository.save(loyaltyDiscountInput);
    }
    getAllDiscounts(): Promise<LoyaltyDiscount[]> {
        return this.loyaltyDiscountRepository.find();
    }
    async addDiscountToCustomer(loyaltyCustomerInput: LoyaltyCustomerInput): Promise<LoyaltyCustomer> {
        const {discountId, customerId} = loyaltyCustomerInput;
        const discount = await this.loyaltyDiscountRepository.findOne({
            where: { id: discountId }
        });
        if (null === discount) {
            throw new Error('discount not exists');
        }
        const customer = await this.customerRepository.findOne({
            where: {id: customerId}
        })
        if (null === customer) {
            throw new Error('customer not exists');
        }
        const loyaltyCustomer = new LoyaltyCustomer();
        loyaltyCustomer.discount = discount;
        loyaltyCustomer.customer = customer;
        return this.loyaltyCustomerRepository.save(loyaltyCustomer);
    }
    async getCustomerDiscount(customerId: number): Promise<LoyaltyCustomer | null> {
        const customer = await this.customerRepository.findOne({
            where: {id: customerId}
        })
        if (null === customer) {
            throw new Error('customer not exists');
        }
        return this.loyaltyCustomerRepository.findOne({
            relations: { customer: true },
            where: { customer }
        });
    }
}
