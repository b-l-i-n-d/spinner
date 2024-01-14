export interface IUser {
    id: string;
    name: string;
    email: string;
    discountId: string;
}

export type IUsers = IUser[];

export interface IDiscount {
    id: string;
    label: string;
    color: string;
    discount: number;
    type: "percent" | "fixed";
}

export type ISpinnerData = IDiscount[];
