import {ShoppingCartActions, ShoppingCartActionTypes} from '../actions/shopping-cart.actions';

const INITIAL_STATE: ReadonlyArray<string> = [];

export function shoppingCartReducer(
  state: ReadonlyArray<string> = INITIAL_STATE,
  action: Readonly<ShoppingCartActions>
): ReadonlyArray<string> {
  switch (action.type) {
    case ShoppingCartActionTypes.ADD_ITEM:
      return [...state, action.itemId];

    case ShoppingCartActionTypes.REMOVE_ITEM:
      const mutableItemsArray: string[] = [...state];
      const idx = mutableItemsArray.findIndex((itemId: string) => itemId === action.itemId);
      if (idx !== -1) {
        mutableItemsArray.splice(idx, 1);
      }

      return [...mutableItemsArray];

    default:
      return state;
  }
}
