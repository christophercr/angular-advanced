import {Action} from '@ngrx/store';

export enum ShoppingCartActionTypes {
  ADD_ITEM = '[ShoppingCart] Add item',
  REMOVE_ITEM = '[ShoppingCart] Remove item'
}

export class ShoppingCartAddItem implements Action {
  /**
   * The type of action
   */
  public readonly type: ShoppingCartActionTypes.ADD_ITEM = ShoppingCartActionTypes.ADD_ITEM;

  /**
   * @param itemId - The id of the item to be set
   */
  public constructor(public itemId: string) {
  }
}

export class ShoppingCartRemoveItem implements Action {
  /**
   * The type of action
   */
  public readonly type: ShoppingCartActionTypes.REMOVE_ITEM = ShoppingCartActionTypes.REMOVE_ITEM;

  /**
   * @param itemId - The id of the item to be removed
   */
  public constructor(public itemId: string) {
  }
}

export type ShoppingCartActions =
  | ShoppingCartAddItem
  | ShoppingCartRemoveItem;
