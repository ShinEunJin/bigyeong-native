import * as firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyBe5BNU_btZn8B21b-197PHiwg65_E_nWY",
  authDomain: "bigyeong-3a9e2.firebaseapp.com",
  projectId: "bigyeong-3a9e2",
  storageBucket: "bigyeong-3a9e2.appspot.com",
  messagingSenderId: "56694359140",
  appId: "1:56694359140:web:4bc02b07acd5f719dccb71",
  measurementId: "G-QTNPJY31WP",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const storage = firebase.storage()
