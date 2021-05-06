
import firebase from "firebase/app";
import "firebase/auth";
// firebase config
const config = {
    apiKey: "AIzaSyBR9c72Cwf_iGb_637sqeLx9heeOPhp-qE",
    authDomain: "e-commerce-3dd09.firebaseapp.com",
    projectId: "e-commerce-3dd09",
    storageBucket: "e-commerce-3dd09.appspot.com",
    messagingSenderId: "631212040102",
    appId: "1:631212040102:web:586270ca15e35e8443b967"
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();