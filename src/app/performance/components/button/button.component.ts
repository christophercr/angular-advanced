import {Attribute, Component, OnInit} from '@angular/core';

export type ButtonType = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor(@Attribute("type") public type: ButtonType = "primary") {
    console.log("--- PerfButton constructor");
  }

  ngOnInit() {
  }

}
