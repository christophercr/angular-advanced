import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingCartComponent} from './pages/shopping-cart/shopping-cart.component';
import {ProductComponent} from './components/product/product.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductsResolverService} from './services/products-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartComponent,
    resolve: {
      products: ProductsResolverService
    },
    children: [
      {
        path: '', component: ProductListComponent
      },
      {
        path: 'product/:id', component: ProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateManagementRoutingModule {
}
