export enum ShoppingCartActionTypes {
  ADD_ITEM = '[ShoppingCart] Add item',
  REMOVE_ITEM = '[ShoppingCart] Remove item'
}

export class ShoppingCartAddItem {
  /**
   * The type of action
   */
  static readonly type: ShoppingCartActionTypes.ADD_ITEM = ShoppingCartActionTypes.ADD_ITEM;

  /**
   * @param itemId - The id of the item to be set
   */
  public constructor(public itemId: string) {
  }
}

export class ShoppingCartRemoveItem {
  /**
   * The type of action
   */
  static readonly type: ShoppingCartActionTypes.REMOVE_ITEM = ShoppingCartActionTypes.REMOVE_ITEM;

  /**
   * @param itemId - The id of the item to be removed
   */
  public constructor(public itemId: string) {
  }
}
