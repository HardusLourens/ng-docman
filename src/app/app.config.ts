import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/environments';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
   ]
};


// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideClientHydration } from '@angular/platform-browser';

// import { routes } from './app.routes';

// // Firebase
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// // Environment
// import { firebaseConfig } from '../environments/environments';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideClientHydration(),
//     importProvidersFrom([
//       AngularFireModule.initializeApp(firebaseConfig),
//       AngularFireAuthModule,
//     ])
//   ]
// };