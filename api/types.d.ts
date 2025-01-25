
export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string;
    phoneNumber: string;
}

export interface IProduct {
    _id: string;
    category: string;
    user: string;
    title: string;
    price: number;
    description: string;
    image: string ;
}

