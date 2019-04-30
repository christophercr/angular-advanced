import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../entities/product.intf';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {
  // @HostBinding('class')
  // cssClass = 'product-overview';

  @Input()
  set product(product: Product) {
    this._product = product;

    const imageIndex = Date.now() % 2; // get a random variant index
    this.productImage = this._product.variants[imageIndex].image;
  }

  get product(): Product {
    return this._product;
  }

  private _product: Product;
  productImage: string;

  constructor(public router: Router, public route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  viewProduct() {
    this.router.navigate(['product', this.product.id], {
      relativeTo: this.route,
      // See https://netbasal.com/set-state-object-when-navigating-in-angular-7-2-b87c5b977bb
      // See https://github.com/angular/angular/pull/27198
      state: {product: this.product}
    });
  }

}
