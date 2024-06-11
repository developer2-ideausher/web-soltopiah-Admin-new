import { useState, useEffect } from "react";
import firebase from './FirebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function useFirebaseAuth() {

    const auth = firebase.auth();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    const verifier =()=>{
        const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // console.log('Response', response);
                },
                "error-callback": (error) => {
                    toast.error(error);
                },
                "expired-callback": () => {
                    toast.error("Expired");
                },
            }
        );
        return recaptchaVerifier;
    }

    const clear = () => {
        // removeOnBoardCookie()
        // removeUserIdCookie()
        // removeUserCookie()
    }
    const signInWithPhoneNumber = (phone, appVerifier) => firebase.auth().signInWithPhoneNumber(phone, appVerifier);

    const sendPasswordResetEmail = (email) => firebase.auth().sendPasswordResetEmail(email);

    const signInWithEmailAndPassword = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

    const createUserWithEmailAndPassword = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

    const signOut = () => firebase.auth().signOut().then(clear);

    const signInWithGoogle = () => firebase.auth().signInWithPopup(googleProvider)

    const signInWithFacebook = () =>auth.signInWithPopup(facebookProvider)


    return {
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
        sendPasswordResetEmail,
        signInWithGoogle,
        signInWithFacebook,
        signInWithPhoneNumber,
        verifier
    };
}