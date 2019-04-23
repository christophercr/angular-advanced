import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './pages/home/home-page.component';
import {AboutPageComponent} from './pages/about/about-page.component';

const routes: Routes = [
  {
    path: 'home', component: HomePageComponent
  },
  {
    path: 'about', component: AboutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
