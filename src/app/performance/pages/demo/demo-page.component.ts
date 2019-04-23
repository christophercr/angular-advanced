import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'performance-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.css']
})
export class DemoPageComponent implements OnInit {

  condition = false;

  constructor() {

  }

  ngOnInit() {
  }

  click(): void {
    console.log("click!");
  }

  toggleCondition(): void {
    this.condition = !this.condition;
  }

}
