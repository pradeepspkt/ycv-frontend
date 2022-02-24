import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA8va1MLGTQJIcG6duGCbYb9M3woXrQCxQ",
    authDomain: "yourcryptovoice-a9117.firebaseapp.com",
    projectId: "yourcryptovoice-a9117",
    storageBucket: "yourcryptovoice-a9117.appspot.com",
    messagingSenderId: "208552234387",
    appId: "1:208552234387:web:4f056380e512b1a8bb2c66",
    measurementId: "G-NYBFL3NSX8"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)


export {app, db, storage}


// const auth = app.auth();
// const db = app.firestore();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const signInWithEmailAndPassword = async (email, password) => {
//     try {
//         await auth.signInWithEmailAndPassword(email, password);
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };
// const registerWithEmailAndPassword = async (name, email, password) => {
//     try {
//         const res = await auth.createUserWithEmailAndPassword(email, password);
//         const user = res.user;
//         await db.collection("users").add({
//             uid: user.uid,
//             name,
//             authProvider: "local",
//             email,
//         });
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };
// const sendPasswordResetEmail = async (email) => {
//     try {
//         await auth.sendPasswordResetEmail(email);
//         alert("Password reset link sent!");
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };
// const logout = () => {
//     auth.signOut();
// };
// export {
//     auth,
//     db,
//     signInWithEmailAndPassword,
//     registerWithEmailAndPassword,
//     sendPasswordResetEmail,
//     logout,
// };