import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeLogger} from 'ngrx-store-logger';
import {storeFreeze} from 'ngrx-store-freeze';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';

// Application Redux State
export interface AppState {
  // reducer interfaces
}

export function logger(reducer: ActionReducer<AppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [logger, storeFreeze]; // include only in development!

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpClientModule,
    StoreModule.forRoot(
      {}, // empty reducers at the root
      {metaReducers}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 50, // retains last 50 states
      name: 'AngularAdvancedApp - NGRX Store DevTools', // shown in the monitor page
      logOnly: false // restrict extension to log-only mode (set to false only in development to enable all the extension features!)
    }),
    AppRoutingModule
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
