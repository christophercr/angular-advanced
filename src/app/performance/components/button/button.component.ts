import {Component, Input, OnInit} from '@angular/core';

export type ButtonType = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input()
  type: ButtonType = "primary";

  constructor() {
    console.log("--- PerfButton constructor");
  }

  ngOnInit() {
  }

}
