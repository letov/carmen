export interface ICustomer {
    id: number | null;
    name: string;
    phone: string;
    test(): string;
}

export class CustomerDTO implements ICustomer {
    id: number | null = null;
    name: string = '';
    phone: string = '';
    test = () => { return this.name; }
}

export class Customer extends CustomerDTO {
    constructor(dto: CustomerDTO) {
        super();
        Object.assign(this, dto);
    }
    test = () => { return this.name; }
}