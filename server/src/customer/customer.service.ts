import { Injectable } from '@nestjs/common';
import {Customer} from "./customer.model";
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import {CustomerInput} from "./dto/customer.dto";
import phone from "phone";
import {localeConfig} from "../config/locale.config";
import { FetchCustomersPaginationArgs } from "./dto/fetch-customers-pagination-args.dto";
import { FetchCustomersPagination } from "./dto/fetch-customers-pagination.dto";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}
    create(customer: CustomerInput): Promise<Customer>{
        customer.phone = this.normalizePhone(customer.phone);
        return this.customerRepository.save(customer);
    }
    findById(id: number): Promise<Customer | null> {
        return this.customerRepository.findOne({
            where: { id }
        });
    }
    findAll(args: FetchCustomersPaginationArgs): Promise<FetchCustomersPagination> {
        let where = {};
        for (let filter of ['name', 'phone']) {
            if (args[filter].length > 0) {
                where[filter] = ILike(`%${args[filter]}%`);
            }
        }
        return this.customerRepository
            .findAndCount({
                take: args.take ?? 10,
                skip: args.skip ?? 0,
                order: {
                    name: "ASC"
                },
                where
            })
            .then(result => {
            const [customers, total] = result;
            return new FetchCustomersPagination(customers, total);
        });
    }
    private normalizePhone(phoneNumber: string): string | null {
        const result = phone(phoneNumber, {country: localeConfig.region}).phoneNumber;
        if (null === result) {
            throw new Error(`Invalid phone number: ${phoneNumber}`);
        }
        return result;
    }
}
