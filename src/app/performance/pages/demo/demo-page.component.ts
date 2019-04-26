import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'performance-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.css']
})
export class DemoPageComponent implements OnInit {

  condition = false;
  isVisible = false;
  images = ['/assets/images/img1.png', '/assets/images/img2.png', '/assets/images/img3.png', '/assets/images/img4.png', '/assets/images/img5.png'];

  constructor() {

  }

  ngOnInit() {
  }

  click(): void {
    console.log('click!');
  }

  toggleCondition(): void {
    this.condition = !this.condition;
  }

  toggleSpinner(): void {
    this.isVisible = !this.isVisible;
  }

}
