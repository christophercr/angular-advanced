import {Product} from '../entities/product.intf';
import {ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {shoppingCartReducer} from './shopping-cart.reducer';
import {ShoppingCartActions} from '../actions/shopping-cart.actions';

/**
 * We define part of the state assigned to the session module
 */
export interface ShoppingCartState {
  /**
   * The session property
   * @link Product
   */
  items: ReadonlyArray<string>;
}

/**
 * We assign a reducer to our 'items' property
 */
export const shoppingCartReducers: ActionReducerMap<ShoppingCartState, ShoppingCartActions> = {
  /**
   * the reducer is assigned to our property
   */
  items: shoppingCartReducer
};

/**
 * The selector will return the part of the state assigned to the logging when called
 */
export const selectShoppingCartItems: MemoizedSelector<object, ReadonlyArray<string>> = createSelector(
  createFeatureSelector<ShoppingCartState>('ShoppingCart'),
  (state: ShoppingCartState) => state.items
);
