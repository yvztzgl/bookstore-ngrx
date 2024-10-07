import { Book } from "../../book-list/models/book.model";

export interface BasketItem{
    item:Book,
    quantity:number,
}

export interface Basket{
    items:BasketItem[],
    total:number,
}