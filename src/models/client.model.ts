export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    addresses: Address[];
    expanded?: boolean;
  }
  
  export interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    zip: string;
  }