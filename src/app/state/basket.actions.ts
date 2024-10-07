import { createActionGroup, props } from '@ngrx/store';
import { Basket, BasketItem } from './models/basket.model';

export const BasketActions = createActionGroup({
  source: 'Basket',
  events: {
    'Add Item': props<BasketItem>(),
  },
});

export const BasketApiActions = createActionGroup({
  source: 'Basket API',
  events: {
    'Retrieved Items': props<{ basket: ReadonlyArray<BasketItem> }>(),
  },
});