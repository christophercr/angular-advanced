import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  premium = true;
  cart = [];

  updateCart(id) {
    this.cart.push(id);
  }

  removeFromCart(id) {
    const idx = this.cart.indexOf(id);
    if (idx !== -1) {
      this.cart.splice(idx, 1);
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
