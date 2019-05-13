import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {ServiceWorkerModule, SwUpdate} from '@angular/service-worker';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeLogger} from 'ngrx-store-logger';
import {storeFreeze} from 'ngrx-store-freeze';
import {first} from 'rxjs/operators';
import {concat, interval} from 'rxjs';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {environment} from '../environments/environment';

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
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // Diagnostic only: inspect router configuration
  constructor(router: Router, private swUpdate: SwUpdate, appRef: ApplicationRef) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    //
    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));

    swUpdate.available.subscribe((event) => {
      console.log('==========> New version available!');
      console.log('==========> Current version is:', event.current);
      console.log('==========> New available version is:', event.available);

      const update = window.confirm('There is a new version of this app available. Do you want to update?');

      if (update) {
        this.swUpdate.activateUpdate().then(() => {
          document.location.reload();
          // console.log('---- The SW has activated the update');
        });
      }
    });

    swUpdate.activated.subscribe((event) => {
      console.log('==========> The app has been updated to the latest version!');
      console.log('==========> Old version was:', event.previous);
      console.log('==========> New version is:', event.current);
    });

    const appStable$ = appRef.isStable.pipe(
      first((isStable) => isStable === true) // emit only the first "true" value, then completes
    );

    const interval$ = interval(1000 * 10); // every 10 secs

    concat(appStable$, interval$).subscribe((_value: any) => {
      this.swUpdate.checkForUpdate().finally(() => console.log('-------- SW check for updates done!'));
    });
  }
}
