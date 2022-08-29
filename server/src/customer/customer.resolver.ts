import {CustomerModel} from "./customer.model";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CustomerService} from "./customer.service";
import {CustomerInput} from "./customer.dto";

@Resolver()
export class CustomerResolver {
    constructor(
        private customerService: CustomerService,
    ) { }
    @Query(() => CustomerModel)
    async customer(
        @Args('id') id: number,
    ): Promise<CustomerModel> {
        return await this.customerService.getById(id);
    }
    @Query(() => [CustomerModel])
    async customers(): Promise<CustomerModel[]> {
        return await this.customerService.getAll();
    }
    @Mutation(() => CustomerModel)
    async createCustomer(
        @Args('customerInput') customerInput: CustomerInput,
    ): Promise<CustomerModel> {
        return await this.customerService.create(customerInput)
    }
}
