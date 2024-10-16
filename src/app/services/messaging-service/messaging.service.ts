import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging;
  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  requestPermission() {
    
    getToken(this.messaging, { vapidKey: environment.vapKey})
      .then((currentToken) => {
        if (currentToken) {
          // console.log('Token received:', currentToken);
          localStorage.setItem('fcm_token',currentToken);
        } else {
          console.error('No registration token available.');
        }
      })
      .catch((err) => {
        console.error('An error occurred while retrieving token. ', err);
      });
  }

  receiveMessage() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      // Handle the message as needed, e.g., show a notification
      // return payload;
    });
  }
}
