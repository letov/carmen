import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { LoyaltyDiscountModel } from "./loyalty-discount.model";
import { LoyaltyCustomerModel } from "./loyalty-customer.model";
import { CustomerModel } from "../customer/customer.model";
import { LoyaltyDiscountInput } from "./loyalty-discount.dto";
import { LoyaltyCustomerInput } from "./loyalty-customer.dto";

@Injectable()
export class LoyaltyService {
    constructor(
        @InjectRepository(LoyaltyDiscountModel)
        private loyaltyDiscountRepository: Repository<LoyaltyDiscountModel>,
        @InjectRepository(LoyaltyCustomerModel)
        private loyaltyCustomerRepository: Repository<LoyaltyCustomerModel>,
        @InjectRepository(CustomerModel)
        private customerRepository: Repository<CustomerModel>,
    ) {}
    createDiscount(loyaltyDiscountInput: LoyaltyDiscountInput): Promise<LoyaltyDiscountModel> {
        return this.loyaltyDiscountRepository.save(loyaltyDiscountInput);
    }
    getAllDiscounts(): Promise<LoyaltyDiscountModel[]> {
        return this.loyaltyDiscountRepository.find();
    }
    async addDiscountToCustomer(loyaltyCustomerInput: LoyaltyCustomerInput): Promise<LoyaltyCustomerModel> {
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
        const loyaltyCustomer = new LoyaltyCustomerModel();
        loyaltyCustomer.discount = discount;
        loyaltyCustomer.customer = customer;
        return this.loyaltyCustomerRepository.save(loyaltyCustomer);
    }
    async getCustomerDiscount(customerId: number): Promise<LoyaltyCustomerModel | null> {
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
