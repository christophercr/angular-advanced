import {Action, State, StateContext} from '@ngxs/store';
import {ShoppingCartAddItem, ShoppingCartRemoveItem} from '../actions/shopping-cart.actions';

export interface ShoppingCartStateModel {
  items: ReadonlyArray<string>;
}

@State<ShoppingCartStateModel>({
  name: 'ShoppingCart',
  defaults: {
    items: []
  }
})
export class ShoppingCartState {

  @Action(ShoppingCartAddItem)
  addItem(context: StateContext<ShoppingCartStateModel>, action: ShoppingCartAddItem) {
    const state = context.getState();
    context.setState({
      ...state,
      items: [...state.items, action.itemId]
    });
  }

  @Action(ShoppingCartRemoveItem)
  removeItem(context: StateContext<ShoppingCartStateModel>, action: ShoppingCartRemoveItem) {
    const state = context.getState();
    const mutableItemsArray: string[] = [...state.items];
    const idx = mutableItemsArray.findIndex((itemId: string) => itemId === action.itemId);
    if (idx !== -1) {
      mutableItemsArray.splice(idx, 1);
    }

    context.setState({
      ...state,
      items: [...mutableItemsArray]
    });
  }
}
