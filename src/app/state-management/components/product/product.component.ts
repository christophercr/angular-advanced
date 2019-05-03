import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Data, ParamMap, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {take} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {ShoppingCartAddItem, ShoppingCartRemoveItem} from '../../actions/shopping-cart.actions';
import {ProductService} from '../../services/product.service';
import {Product, ProductVariant} from '../../entities/product.intf';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() premium;

  product: Product;
  selectedVariant: number;
  imageTooltip = 'They are awesome!';
  onSale = true;
  brand = 'Angular';

  get link() {
    return this.product ? this.product.link : '';
  }

  get sizes() {
    return this.product ? this.product.sizes : [];
  }

  get variants(): ProductVariant[] {
    return this.product ? this.product.variants : [];
  }

  get title() {
    return this.product ? (this.brand + ' ' + this.product.name) : '';
  }

  get description() {
    return this.product ? this.product.description : '';
  }

  get image() {
    return this.variants.length ? this.variants[this.selectedVariant].image : '';
  }

  get inventory() {
    return this.variants.length ? this.variants[this.selectedVariant].quantity : 0;
  }

  get sale() {
    if (this.onSale) {
      return `${this.title} are on sale!`;
    } else {
      return `${this.title} are not on sale`;
    }
  }

  get shipping() {
    if (this.premium) {
      return 'Free';
    }
    return 4.50;
  }

  get productDetails() {
    return Object.keys(this._productDetails).length ? this._productDetails[this.variants[this.selectedVariant].id] : [];
  }

  _productDetails = {};

  constructor(public route: ActivatedRoute, public router: Router, public productService: ProductService, public store: Store) {
  }

  ngOnInit() {
    combineLatest(
      this.route.parent.data, // the resolve is defined in the parent route!
      this.route.paramMap
    ).pipe(
      take(1) // complete after the first emission! So no need to manually unsubscribe ;)
    ).subscribe((combinedValue: (ParamMap | Data)[]) => {
      console.log('==========> combinedValue', combinedValue);
      const {product} = window.history.state;

      if (product) {
        this.product = product;
        console.log('==========> product found in window.history.state!');
      } else {
        const productId = combinedValue[1].get('id');
        const {products} = combinedValue[0] as { products: Product[] };

        this.product = products.find((productItem: Product) => {
          return Number(productItem.id) === Number(productId);
        });
        console.log('==========> product found via the parent route data!');
      }

      this.selectedVariant = 0;

      this.fetchProductDetails();
    });
  }

  fetchProductDetails() {
    for (const variant of this.variants) {
      /* const httpSubscription = */
      this.productService.getProductDetails(variant.id).subscribe(
        (details: string[]) => {  // success scenario
          this._productDetails[variant.id] = details;
        },
        (error) => { // error scenario
          console.error('You should not see this error because it is handled in the ProductService!!');
        }
      );

      // setTimeout(() => {
      //   httpSubscription.unsubscribe(); // cancel the Http request
      // }, 800);
    }
  }

  addToCart() {
    this.store.dispatch(new ShoppingCartAddItem(this.variants[this.selectedVariant].id));
  }

  removeFromCart() {
    this.store.dispatch(new ShoppingCartRemoveItem(this.variants[this.selectedVariant].id));
  }

  updateProduct(variantIndex) {
    this.selectedVariant = variantIndex;
  }

  goBack() {
    this.router.navigate(['state-management']);
  }

  trackItemFn(item: ProductVariant, index: number) {
    return item.id;
  }

}
