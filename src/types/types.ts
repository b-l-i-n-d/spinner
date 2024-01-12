export interface IUser {
    name: string;
    email: string;
    discountId: string;
}

export interface IUsers {
    [key: string]: IUser;
}
