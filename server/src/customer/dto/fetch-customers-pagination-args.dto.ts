import { Field, Int, ArgsType } from '@nestjs/graphql'
import { Length, Max, Min } from 'class-validator'

@ArgsType()
export class FetchCustomersPaginationArgs {
    @Field(() => Int)
    @Min(0)
    skip = 0

    @Field(() => Int)
    @Min(1)
    @Max(50)
    take = 25

    @Field(() => String)
    @Length(0, 50)
    name = ''

    @Field(() => String)
    @Length(0, 50)
    phone = ''
}