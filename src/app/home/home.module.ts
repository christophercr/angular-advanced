import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomePageComponent} from './pages/home/home-page.component';
import {AboutPageComponent} from './pages/about/about-page.component';

@NgModule({
  declarations: [HomePageComponent, AboutPageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [
    HomePageComponent,
    AboutPageComponent
  ]
})
export class HomeModule {
}
