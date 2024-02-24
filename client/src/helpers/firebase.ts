import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential, signInWithEmailAndPassword } from "firebase/auth";

import constants from './constants';
interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

//TODO_UPDATE_THIS: Update the firebaseConfig to your firebase config
const firebaseConfig : FirebaseConfig = {
    apiKey: "AIzaSyBqpQ-JqcJ1bcJaxVfHb7eL-ygSSRD3SNQ",
    authDomain: "worlds-best-boilerplate.firebaseapp.com",
    projectId: "worlds-best-boilerplate",
    storageBucket: "worlds-best-boilerplate.appspot.com",
    messagingSenderId: "875669545922",
    appId: "1:875669545922:web:e31d35a275d9e65faeec5b"
}

initializeApp(firebaseConfig);
const fireBaseAuth = getAuth();
const GoogleProvider = new GoogleAuthProvider();


const SignUpWithGooglePopUp = async (setError : (msg : string) => void, login = true) => {
    try {
        const result = await signInWithPopup(fireBaseAuth, GoogleProvider);
        const user = result.user;
        if (!user || !user.email || !user.displayName || !user.uid) {
            throw new Error('Error creating account');
        }
        if (!login) {
            const response = await fetch(`${constants.serverUrl}${constants.endpoints.googleSignUp}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, name: user.displayName, firebaseUID: user.uid }),
            });
            if (!response.ok) {
                throw new Error('Error creating account');
            }
        };
        window.location.href = constants.routes.defaultAuthenticatedRoute;
    } catch (error) {
        //@ts-ignore
        if (error.code === 'auth/account-exists-with-different-credential' && !login) {
            setError(`Account already exists with email`)
        } else {
            // Handle other errors
            setError(`Error ${login ? 'logging in' : 'creating account'} with Google`)
        }
    }
};

const LogInWithEmail = async (setError : (msg : string) => void, email : string, password : string, navigate : boolean = true) => {
    try {
        const user : UserCredential = await signInWithEmailAndPassword(fireBaseAuth, email, password);
        if (!user) {
            throw new Error('Cannot find user with this email or password');
        }
        if (!navigate) return;
        window.location.href = constants.routes.defaultAuthenticatedRoute;
    } catch (error) {
        setError(`Error logging in with email`)
        return;
    }
}


export { GoogleProvider, fireBaseAuth, SignUpWithGooglePopUp, LogInWithEmail };