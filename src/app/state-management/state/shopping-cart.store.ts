import {Injectable} from '@angular/core';
import {arrayAdd, Store, StoreConfig} from '@datorama/akita';

export interface ShoppingCartState {
  items: string[];
}

export function createInitialState(): ShoppingCartState {
  return {
    items: []
  };
}

@Injectable()
@StoreConfig({
  name: 'ShoppingCart'
})
export class ShoppingCartStore extends Store<ShoppingCartState> {
  constructor() {
    super(createInitialState());
  }

  addItem(itemId: string) {
    this.update(state => {
      return {
        items: arrayAdd(state.items, itemId)
      };
    });
  }

  removeItem(itemId: string) {
    this.update(state => {
      const mutableItemsArray: string[] = [...state.items];
      const idx = mutableItemsArray.findIndex((id: string) => id === itemId);
      if (idx !== -1) {
        mutableItemsArray.splice(idx, 1);
      }

      return {
        // arrayRemove cannot be used here because removes all the items with the same id!
        // items: arrayRemove(state.items, itemId)
        items: [...mutableItemsArray]
      };
    });
  }

  // logging functionality
  akitaPreUpdate(prevState: Readonly<ShoppingCartState>, nextState: Readonly<ShoppingCartState>): ShoppingCartState {
    console.log('==========> prevState', prevState);
    console.log('==========> nextState', nextState);

    return nextState;
  }
}
