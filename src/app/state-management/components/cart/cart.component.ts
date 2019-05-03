import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectShoppingCartItems} from '../../reducers';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: ReadonlyArray<string> = [];

  constructor(public store: Store<any>) {
    store.pipe(select(selectShoppingCartItems)).subscribe((items) => {
      console.log('--------- items', items);
      this.items = items;
    });
  }

  ngOnInit() {
  }

}
