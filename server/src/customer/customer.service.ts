import { Injectable } from '@nestjs/common';
import {CustomerModel} from "./customer.model";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import {CustomerInput} from "./customer.dto";
import phone from "phone";
import {localeConfig} from "../config/locale.config";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerModel)
        private customerRepository: Repository<CustomerModel>,
    ) {}
    create(customerInput: CustomerInput): Promise<CustomerModel>{
        customerInput.phone = this.normalizePhone(customerInput.phone);
        return this.customerRepository.save(customerInput);
    }
    getById(id: number): Promise<CustomerModel | null> {
        return this.customerRepository.findOne({
            where: { id }
        });
    }
    getAll(): Promise<CustomerModel[]> {
        return this.customerRepository.find();
    }
    private normalizePhone(phoneNumber: string): string | null {
        const result = phone(phoneNumber, {country: localeConfig.region}).phoneNumber;
        if (null === result) {
            throw new Error(`Invalid phone number: ${phoneNumber}`);
        }
        return result;
    }
}
