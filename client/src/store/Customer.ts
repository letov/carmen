export interface ICustomer {
    id: number | null;
    name: string;
    phone: string;
    image: string | null;
    uploadImage: File | undefined;
}

export class CustomerDTO implements ICustomer {
    id: number | null = null;
    name: string = '';
    phone: string = '';
    image: string | null = null;
    uploadImage: File | undefined = undefined;
}

export class Customer extends CustomerDTO {
    constructor(dto: CustomerDTO) {
        super();
        Object.assign(this, dto);
    }
}

export class CustomerInput {
    constructor(customer: ICustomer) {
        const { id, image, ..._customer} = customer;
        Object.assign(this, _customer);
    }
}
