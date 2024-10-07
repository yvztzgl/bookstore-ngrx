import { createReducer, on } from '@ngrx/store';
import { Basket, BasketItem } from './models/basket.model';
import { BasketActions, BasketApiActions } from './basket.actions';



export const initialState: ReadonlyArray<BasketItem> = [];

export const basketReducer = createReducer(
  initialState,
  on(BasketApiActions.retrievedItems, (_state, { basket}) => {
    console.log(basket);
    return basket;
  }),
  on(BasketActions.addItem, (state, item) => {

    console.log("incoming item -->", item)
    console.log("current state --> ", state)
    let ind = state.findIndex(x => x.item.id == item.item.id);
    if (ind > -1) {
      let newState = JSON.parse(JSON.stringify(state));
      newState[ind].quantity += 1;
      localStorage.setItem('basket', JSON.stringify(newState))
      return newState;
    }
    localStorage.setItem('basket', JSON.stringify([...state, item]))
    return [...state, item];
  })

);