export interface IUser {
    name: string;
    email: string;
    discountId: string;
}

export interface IUsers {
    [key: string]: IUser;
}

export interface IDiscount {
    id: string;
    label: string;
    color: string;
    discount: number;
    type: "percent" | "fixed";
}

export type ISpinnerData = IDiscount[];
