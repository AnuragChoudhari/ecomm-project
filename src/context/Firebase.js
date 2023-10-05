import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import { getDatabase, set,ref } from "firebase/database";

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

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const FirebaseContext = createContext(null);

// Cutom hook

export const useFirebase = () => useContext(FirebaseContext);

// Realtime Database

const putData = (key, data) =>{
    set(ref(database, key), data)
}

// Signup User

const signupUserWithEmailAndPassword  = (email, password) =>{
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

// SignIn user

const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
}

// Check signin userdetails

const checkSignInDetails = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // User is signed in, resolve with user details
          resolve(user);
        } else {
          // No user signed in, reject with null
          reject(null);
        }
      });
    });
  };

// Logout User

const logOutUser = () => {
    signOut(firebaseAuth).then(() => {
        // Sign-out successful.
        console.log("Logout Succesfull");
      }).catch((error) => {
        // An error happened.
        console.log("Error occured", error);
      });
      
}
  
export const FirebaseProvider = (props) =>{
    return(
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, putData, signinUserWithEmailAndPassword, checkSignInDetails, logOutUser}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}