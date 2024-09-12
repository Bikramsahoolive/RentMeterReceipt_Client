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
    badge:'https://www.pngitem.com/pimgs/m/121-1213451_letter-n-in-circle-hd-png-download.png',
    renotify:true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // Close the notification after click

  // Check which action was clicked
  if (event.action === 'open_action') {
    // Handle the "Open" button click
    clients.openWindow('https://rnmr.vercel.app/login'); // Open the URL in a new tab
  } else if (event.action === 'dismiss_action') {
    // Handle the "Dismiss" button click
    console.log('Dismiss action clicked');
    event.notification.close();
  } else {
    // Handle any default click
    clients.openWindow('https://rnmr.vercel.app');
  }
});

