import { Customer } from "./customer.model";
import { Args, Field, InputType, Mutation, Query, Resolver } from "@nestjs/graphql";
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
    customer(
        @Args('id') id: number,
    ): Promise<Customer> {
        return this.customerService.findById(id);
    }
    @Query(() => FetchCustomersPagination)
    customersPagination(
        @Args() args: FetchCustomersPaginationArgs
    ): Promise<FetchCustomersPagination> {
        return this.customerService.findAll(args);
    }
    @Mutation(() => Customer)
    createCustomer(
        @Args('customerInput') customer: CustomerInput,
    ): Promise<Customer> {
        return this.customerService.save(customer)
    }
    @Mutation(() => Boolean)
    updateCustomer(
        @Args('id') id: number,
        @Args('customerInput') customer: CustomerInput,
    ): Promise<Boolean> {
        return this.customerService.update(id, customer)
    }
    @Mutation(() => Boolean)
    deleteCustomer(
        @Args('id') id: number,
    ): Promise<Boolean> {
        return this.customerService.delete(id);
    }
}
