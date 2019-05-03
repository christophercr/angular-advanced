import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: ReadonlyArray<string> = [];

  constructor(public store: Store) {
    this.store.select(state => state.ShoppingCart.items).subscribe((items) => {
      console.log('--------- items', items);
      this.items = items;
    });
  }

  ngOnInit() {
  }

}
