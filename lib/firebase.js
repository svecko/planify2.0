import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCzUz_IGbLtqyTtVIBkr6Tjq_GJTa5Ae9I',
  authDomain: 'planify-814a4.firebaseapp.com',
  projectId: 'planify-814a4',
  storageBucket: 'planify-814a4.appspot.com',
  messagingSenderId: '1003483967563',
  appId: '1:1003483967563:web:8a05ef35c47210a5575dce',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;

export function docToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    dueDate: data.dueDate.toMillis(),
  };
}
