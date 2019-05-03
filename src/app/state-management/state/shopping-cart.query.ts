import {Query} from '@datorama/akita';
import {ShoppingCartState, ShoppingCartStore} from './shopping-cart.store';
import {Injectable} from '@angular/core';

@Injectable()
export class ShoppingCartQuery extends Query<ShoppingCartState> {
  // IMPORTANT: the select method always return an Observable that emits the initial value first
  items$ = this.select(state => {
    return state.items;
  });

  constructor(protected store: ShoppingCartStore) {
    super(store);
  }

}
