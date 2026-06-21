importScripts(
  'https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js',
);

importScripts(
  'https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyAqze03VXz8hvxEY27mSo9NfBtjNW7Eeu4',
  authDomain: 'push-notifications-ded07.firebaseapp.com',
  projectId: 'push-notifications-ded07',
  messagingSenderId: '165894312137',
  appId: '1:165894312137:web:3626fabedc34e4fd80fd18',
});

const messaging = firebase.messaging();
