import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import {StateManagementRoutingModule} from './state-management-routing.module';
import {ShoppingCartComponent} from './pages/shopping-cart/shopping-cart.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductComponent} from './components/product/product.component';
import {ProductOverviewComponent} from './components/product-overview/product-overview.component';
import {CartComponent} from './components/cart/cart.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {shoppingCartReducers} from './reducers';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ProductDetailsComponent,
    ProductComponent,
    ProductOverviewComponent,
    CartComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StateManagementRoutingModule,
    StoreModule.forFeature('ShoppingCart', shoppingCartReducers)
  ]
})
export class StateManagementModule {
}
