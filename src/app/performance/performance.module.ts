import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PerformanceRoutingModule} from './performance-routing.module';
import {DemoPageComponent} from './pages/demo/demo-page.component';
import {ButtonComponent} from "./components/button/button.component";
import {NgIfDirective} from './directives/ng-if/ng-if.directive';

@NgModule({
  declarations: [ButtonComponent, DemoPageComponent, NgIfDirective],
  imports: [
    CommonModule,
    PerformanceRoutingModule
  ]
})
export class PerformanceModule {
}
