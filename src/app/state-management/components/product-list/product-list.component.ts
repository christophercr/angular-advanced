import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../entities/product.intf';
import {take} from 'rxjs/operators';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.pipe(
      take(1) // complete after the first emission! So no need to manually unsubscribe ;)
    ).subscribe((data: { products: Product[] }) => {
      // pick the products stored in the route's data set by the resolve
      this.products = data.products;
    });
  }

}
