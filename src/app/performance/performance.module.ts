import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PerformanceRoutingModule} from './performance-routing.module';
import {DemoPageComponent} from './pages/demo/demo-page.component';
import {ButtonComponent} from './components/button/button.component';
import {NgIfDirective} from './directives/ng-if/ng-if.directive';
import {SpinnerDirective} from './directives/spinner/spinner.directive';
import {CarouselDirective} from './directives/carousel/carousel.directive';
import {SpinnerComponent} from './components/spinner/spinner.component';

@NgModule({
  declarations: [ButtonComponent, DemoPageComponent, NgIfDirective, SpinnerDirective, SpinnerComponent, CarouselDirective],
  imports: [
    CommonModule,
    PerformanceRoutingModule
  ],
  entryComponents: [SpinnerComponent]
})
export class PerformanceModule {
}
