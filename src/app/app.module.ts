import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {ServiceWorkerModule, SwUpdate} from '@angular/service-worker';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {first} from 'rxjs/operators';
import {concat, interval} from 'rxjs';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {environment} from '../environments/environment';

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
    }),
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
