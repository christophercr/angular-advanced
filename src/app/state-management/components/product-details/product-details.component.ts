import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() details;

  constructor() {
  }

  ngOnInit() {
  }

}
