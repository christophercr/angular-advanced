import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpClientModule,
    AppRoutingModule,
    AkitaNgDevtools.forRoot({
      maxAge: 50, // retains last 50 states
      logTrace: false // output a console.trace() for each action in the console (useful only in development)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    //
    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
