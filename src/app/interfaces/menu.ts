export interface IMenuCategory {
    image: string;
    name: string;
    link: string;
}

export interface IMenuProduct {
    image: string;
    name: string;
    description: string;
    price: string;
    discount_price: string | undefined;
    category: number;
}