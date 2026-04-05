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
let dbInst;
try {
  dbInst = initializeFirestore(app, { experimentalForceLongPolling: true, useFetchStreams: false });
} catch {
  dbInst = getFirestore(app);
}
export const db = dbInst;

export function getNetworkErrorMessage(error){
  const code = String(error?.code ?? '');
  if(code.includes('permission-denied')) return 'Нет доступа. Проверь роль, верификацию и правила Firestore.';
  if(code.includes('unavailable') || code.includes('deadline-exceeded') || code.includes('failed-precondition')) return 'Нет связи с Firebase. Проверь интернет/VPN/прокси.';
  return error?.message || 'Ошибка Firebase.';
}
