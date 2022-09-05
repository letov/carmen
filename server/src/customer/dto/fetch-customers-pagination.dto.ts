import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Customer } from "../customer.model";

@ObjectType()
export class FetchCustomersPagination {
    constructor(customers: Customer[] = [], total: number = 0) {
        this.customers = customers;
        this.total = total;
    }

    @Field(() => [Customer])
    customers

    @Field(() => Int)
    total
}