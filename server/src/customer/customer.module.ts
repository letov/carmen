import { Module } from '@nestjs/common';
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./customer.model";
import { CustomerResolver } from "./customer.resolver";
import { FileService } from "../file/file.service";

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    providers: [CustomerService, CustomerResolver, FileService],
})
export class CustomerModule {}
