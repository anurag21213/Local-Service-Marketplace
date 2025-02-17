importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
    
    apiKey: "AIzaSyDUWELcD_TeYreIeJj1tRTMBCeYF8NZEE8",
    authDomain: "ssss-80338.firebaseapp.com",
    projectId: "ssss-80338",
    storageBucket: "ssss-80338.firebasestorage.app",
    messagingSenderId: "643922021623",
    appId: "1:643922021623:web:6aabbac59bfbb9952e97f2",
    measurementId: "G-RFRM33SH88"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log("Received background message: ", payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/firebase-logo.png",
    });
});