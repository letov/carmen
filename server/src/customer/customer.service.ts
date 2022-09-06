import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Customer } from "./customer.model";
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerInput } from "./dto/customer.dto";
import phone from "phone";
import { localeConfig } from "../config/locale.config";
import { FetchCustomersPaginationArgs } from "./dto/fetch-customers-pagination-args.dto";
import { FetchCustomersPagination } from "./dto/fetch-customers-pagination.dto";
import { Cache } from "cache-manager";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {}
    async clearCustomerListCache() {
        await this.cacheManager.store.del(
            await this.cacheManager.store.keys('customer:findAll:*')
        );
    }
    async create(customer: CustomerInput): Promise<Customer> {
        await this.clearCustomerListCache();
        customer.phone = this.normalizePhone(customer.phone);
        return this.customerRepository.save(customer);
    }
    findById(id: number): Promise<Customer | null> {
        return this.customerRepository.findOne({
            cache: {
                id: `customer:findById:${id}`,
                milliseconds: Number(process.env.REDIS_DEFAULT_TTL),
            },
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
        args.take = args.take ?? 10;
        args.skip = args.skip ?? 0;
        return this.customerRepository
            .findAndCount({
                cache: {
                    id: `customer:findAll:${JSON.stringify(args)}`,
                    milliseconds: Number(process.env.REDIS_DEFAULT_TTL),
                },
                take: args.take,
                skip: args.skip,
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
