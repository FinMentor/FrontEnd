importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyCuNHDltL9pp8Tt0U4ZAsDZ8kk29bAg7B0",
  authDomain: "pleasegivemeassets.firebaseapp.com",
  projectId: "pleasegivemeassets",
  storageBucket: "pleasegivemeassets.appspot.com",
  messagingSenderId: "728160856151",
  appId: "1:728160856151:web:243a41a1ee061743bc9b12",
  measurementId: "G-BMVDRVX4QM",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신:", payload);

  if (payload.data && payload.data.foreground === "false") {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "@/assets/icons/alert-icon.svg", // 실제 아이콘 경로로 변경하세요
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
