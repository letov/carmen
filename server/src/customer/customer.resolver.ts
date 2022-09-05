import { Customer } from "./customer.model";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomerService } from "./customer.service";
import { CustomerInput } from "./dto/customer.dto";
import { FetchCustomersPaginationArgs } from "./dto/fetch-customers-pagination-args.dto";
import { FetchCustomersPagination } from "./dto/fetch-customers-pagination.dto";

@Resolver()
export class CustomerResolver {
    constructor(
        private customerService: CustomerService,
    ) { }
    @Query(() => Customer)
    async customer(
        @Args('id') id: number,
    ): Promise<Customer> {
        return await this.customerService.findById(id);
    }
    @Query(() => FetchCustomersPagination)
    async customersPagination(
        @Args() args: FetchCustomersPaginationArgs
    ): Promise<FetchCustomersPagination> {
        return await this.customerService.findAll(args);
    }
    @Mutation(() => Customer)
    async createCustomer(
        @Args('customerInput') customer: CustomerInput,
    ): Promise<Customer> {
        return await this.customerService.create(customer)
    }
}
