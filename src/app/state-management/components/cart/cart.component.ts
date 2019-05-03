import {Component, OnInit} from '@angular/core';
import {ShoppingCartQuery} from '../../state/shopping-cart.query';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: ReadonlyArray<string> = [];

  constructor(public shoppingCartQuery: ShoppingCartQuery) {
    this.shoppingCartQuery.items$.subscribe((items) => {
      console.log('--------- items', items);
      this.items = items;
    });
  }

  ngOnInit() {
  }

}
