import { Category } from "./category";
import { Tag } from "./tag";

export interface Product {
    id: number;
    name: string;
    priceBase: number;
    priceDiscount: number;
    sku: string;
    category?:Category
    image: string;
    tags?: Tag[]
}

export interface ProductByBranch extends Product {
    amount: number;
    branchProduct: number;
}