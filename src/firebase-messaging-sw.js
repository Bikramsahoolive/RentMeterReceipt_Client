importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAzx5HTCuPhHbUZdo9p-2AMP2X8eReV72o",
  authDomain: "messagingapp-d82eb.firebaseapp.com",
  projectId: "messagingapp-d82eb",
  storageBucket: "messagingapp-d82eb.appspot.com",
  messagingSenderId: "19554548647",
  appId: "1:19554548647:web:31702d28a3a329ab331482"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    renotify:true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action =='open_action') {
    clients.openWindow('https://rnmr.vercel.app/login');
  } else if (event.action =='dismiss_action') {
    event.notification.close();
  } else {
    // clients.openWindow('https://rnmr.vercel.app');
  }
});

