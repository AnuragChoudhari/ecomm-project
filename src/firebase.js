import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyD-O1_l8gpAfISi5Jh6J09rjZ_2IJ6s9tI",
    authDomain: "ecomm-cce0e.firebaseapp.com",
    projectId: "ecomm-cce0e",
    storageBucket: "ecomm-cce0e.appspot.com",
    messagingSenderId: "922672620389",
    appId: "1:922672620389:web:b3b406535298656c44378c",
    measurementId: "G-ZD89KRSQ2T",
    databaseURL: "https://ecomm-cce0e-default-rtdb.firebaseio.com"
  };

  export const app = initializeApp(firebaseConfig);