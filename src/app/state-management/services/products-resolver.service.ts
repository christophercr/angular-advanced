import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../entities/product.intf';
import {ProductService} from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private productService: ProductService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> | Promise<Product[]> | Product[] {
    return this.productService.getProducts();
  }

}
