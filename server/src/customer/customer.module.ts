import { Module } from '@nestjs/common';
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModel } from "./customer.model";
import { CustomerResolver } from "./customer.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([CustomerModel])],
    providers: [CustomerService, CustomerResolver],
})
export class CustomerModule {}
