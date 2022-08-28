import { Injectable } from '@nestjs/common';
import { Customer } from "./customer.model";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import {CustomerInput} from "./customer.dto";
import phone from "phone";
import {localeConfig} from "../config/locale.config";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}
    create(customerInput: CustomerInput): Promise<Customer>{
        customerInput.phone = this.normalizePhone(customerInput.phone);
        return this.customerRepository.save(customerInput);
    }
    findAll(): Promise<Customer[]> {
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
