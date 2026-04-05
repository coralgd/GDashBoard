import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, initializeFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

export const app = initializeApp({
  apiKey: "AIzaSyB7QbVxGHR7Qm8o8Wzl_wxsCpzMUdS5rws",
  authDomain: "gdboard-add4a.firebaseapp.com",
  projectId: "gdboard-add4a",
  storageBucket: "gdboard-add4a.appspot.com",
  messagingSenderId: "883125028740",
  appId: "1:883125028740:web:c504de4139943b8606bfd1"
});

export const auth = getAuth(app);
let dbInstance = null;
try {
  dbInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false
  });
} catch (e) {
  console.warn('Fallback to default Firestore transport:', e?.message || e);
  dbInstance = getFirestore(app);
}
export const db = dbInstance;

export function getNetworkErrorMessage(error){
  const code = error?.code || '';
  if(code.includes('unavailable') || code.includes('deadline-exceeded') || code.includes('failed-precondition')){
    return 'Нет связи с сервером Firebase. Проверь интернет, VPN/прокси и правила Firestore.';
  }
  if(code.includes('permission-denied')){
    return 'Доступ запрещён правилами Firestore. Проверь роль, верификацию и security rules.';
  }
  return error?.message || 'Неизвестная ошибка подключения к Firebase.';
}
