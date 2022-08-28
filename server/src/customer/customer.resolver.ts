import {Customer} from "./customer.model";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CustomerService} from "./customer.service";
import {CustomerInput} from "./customer.dto";

@Resolver()
export class CustomerResolver {
    constructor(
        private customerService: CustomerService,
    ) { }
    @Query(() => [Customer])
    async customers(): Promise<Customer[]> {
        return await this.customerService.findAll();
    }
    @Mutation(() => Customer)
    async createCustomer(
        @Args('customerInput') customerInput: CustomerInput,
    ): Promise<Customer> {
        return await this.customerService.create(customerInput)
    }
}