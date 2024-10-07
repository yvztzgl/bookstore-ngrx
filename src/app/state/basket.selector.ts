import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Basket, BasketItem } from './models/basket.model';
import { Book } from '../book-list/models/book.model';

export const selectBasket = createFeatureSelector<ReadonlyArray<BasketItem>>('basket');
export const selectBook = (book:Book) => createSelector(selectBasket,(basket) =>{
    
    if(book){
        return basket.find(x => x.item.id == book.id);
    }else{
        return undefined
    }
})
