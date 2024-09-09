import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environment';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(environment.firebaseConfig);



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
      .then((registration) => {
        // console.log('Service Worker registered:', registration);
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  }
  