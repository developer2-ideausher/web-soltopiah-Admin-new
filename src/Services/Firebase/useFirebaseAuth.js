import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";
import { auth, googleProvider } from "./FirebaseConfig";
import { firebaseErrorFinder } from "./FirebaseErrors";
import { useRef } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function useFirebaseAuth() {
  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);

  const createUserWithEmailMethod = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //  Send a verification email

      const user = auth.currentUser;

      try {
        await sendEmailVerification(user, {
          url: `${window.location.origin}`,
          handleCodeInApp: true,
        });
      } catch (error) {}

      // await sendEmailVerification(auth.currentUser)
      // Set up the cookie expiry time
      const expiryTime = new Date(Date.now() + 3600 * 1000);
      // Set the cookie
      const token = auth.currentUser.accessToken;
      return {
        status: true,
        user: auth.currentUser,
        token: token,
        expiryTime: expiryTime,
      };
    } catch (e) {
      const error = firebaseErrorFinder[e.code];
      toast.error(error ? error : "Encounterd some errors");
      return { status: false, error: error };
    }
  };
  const updateProfile = async (payload) => {
    const user = auth.currentUser;
    await updateProfile(user, payload);
  };
  const deleteMyAccount = async () => {
    const user = auth.currentUser;
    await user.delete();
  };
  const resendEmailVerificationLink = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      await sendEmailVerification(user, {
        url: `${window.location.origin}`,
        handleCodeInApp: true,
      });
      toast.success("Verification link has been resend successfully", {
        toastId: "verification-email-resend",
      });
    } catch (e) {
      const error = firebaseErrorFinder[e.code];
      toast.error(error ? error : "Encounterd some errors");
    }
  };

  const loginWithEmailAndPassword = async (email, password, redirect = "") => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res)
    //   if (!res.user.emailVerified && redirect != "") {
    //     return { status: false };
    //   }
      const expiryTime = new Date(Date.now() + 3600 * 1000);
      const token = await auth.currentUser.getIdToken();
      return { status: true, user: auth.currentUser, token: token, expiryTime };
    } catch (e) {
      const error = firebaseErrorFinder[e.code];
      toast.error(error ? error : "Encounterd some errors");
      return { status: false, error: error };
    }
  };

  const logOut = async () => {
    try {
      const res = await signOut(auth);
      Cookies.remove("name");
      Cookies.remove("token");
      Cookies.remove("profilePic");
      return { status: true };
    } catch (e) {
      const error = firebaseErrorFinder[e.code];
      toast.error(error ? error : "Encounterd some errors");
      return { status: false, error: error };
    }
  };

  // const forgotPassword = async (email) => {
  //     await sendPasswordResetEmail(auth, email);
  //     toast.success("Reset password email has been sent successfully")
  // }
  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset password email has been sent successfully", {
        toastId: "firebase-reset-password-sent-message",
      });
    } catch (e) {
      const errorMessage = firebaseErrorFinder[e.code]
        ? firebaseErrorFinder[e.code]
        : "Something went wrong during authentication. Please refresh and retry.";

      toast.error(errorMessage, {
        toastId: "firebase-error",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      // Check if this is the user's first sign-in
      const isFirstSignIn =
        user.metadata.creationTime === user.metadata.lastSignInTime;

      // Set up the cookie expiry time
      const expiryTime = new Date(Date.now() + 3600 * 1000);
      // Set the cookie
      const token = auth.currentUser.accessToken;

      return {
        status: true,
        user: auth.currentUser,
        token: token,
        isFirstSignIn: isFirstSignIn,
        expiryTime,
      };
    } catch (e) {
      const error = firebaseErrorFinder[e.code];
      toast.error(error ? error : "Encounter some errors");
      return { status: false, error: e };
    }
  };

  const initializeRecaptcha = (container) => {
    if (!recaptchaVerifierRef.current && container) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, container, {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow user to proceed with authentication
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        },
      });
    }
  };

  const phoneSignIn = async (phoneNumber) => {
    try {
      if (!recaptchaVerifierRef.current) {
        toast.error("ReCAPTCHA verifier not initialized");
        return { status: false, error: "ReCAPTCHA verifier not initialized" };
      }
      const recaptchaVerifier = recaptchaVerifierRef.current;
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      confirmationResultRef.current = result;
      toast.success("OTP has been send to your phone number");
      return { status: true, data: result };
    } catch (e) {
      const error = firebaseErrorFinder[e.code];
      toast.error(error ? error : "Encounter some errors");
      return { status: false, error: error };
    }
  };

  const confirmCode = async (verificationCode) => {
    try {
      const res = await confirmationResultRef.current.confirm(verificationCode);
      const user = res.user;
      // Check if this is the user's first sign-in
      const isFirstSignIn =
        user.metadata.creationTime === user.metadata.lastSignInTime;

      // Set up the cookie expiry time
      const expiryTime = new Date(Date.now() + 3600 * 1000);
      // Set the cookie
      const token = auth.currentUser.accessToken;

      toast.success("Phone number has been verified successfully.");
      return {
        status: true,
        user: auth.currentUser,
        token: token,
        isFirstSignIn: isFirstSignIn,
        expiryTime,
      };
    } catch (e) {
      const error = firebaseErrorFinder[e.code];
      toast.error(error ? error : "Encounter some errors");
      return { status: false, error: error };
    }
  };

  return {
    createUserWithEmailMethod,
    resendEmailVerificationLink,
    logOut,
    loginWithEmailAndPassword,
    forgotPassword,
    signInWithGoogle,
    initializeRecaptcha,
    phoneSignIn,
    confirmCode,
    updateProfile,
    deleteMyAccount,
  };
}
