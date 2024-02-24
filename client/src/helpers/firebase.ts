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

const firebaseConfig : FirebaseConfig = {
    apiKey: "AIzaSyAE0Avfto5M5B8CJISL55UmEorEXI-s_IU",
    authDomain: "sheetz-ai.firebaseapp.com",
    projectId: "sheetz-ai",
    storageBucket: "sheetz-ai.appspot.com",
    messagingSenderId: "839793654708",
    appId: "1:839793654708:web:e4a75e6cd603743e0a10e1",
}

//     apiKey: "AIzaSyAE0Avfto5M5B8CJISL55UmEorEXI-s_IU",
//     authDomain: "sheetz-ai.firebaseapp.com",
//     projectId: "sheetz-ai",
//     storageBucket: "sheetz-ai.appspot.com",
//     messagingSenderId: "839793654708",
//     appId: "1:839793654708:web:e4a75e6cd603743e0a10e1",
//     measurementId: "G-V99LY9L2E4"

initializeApp(firebaseConfig);
const fireBaseAuth = getAuth();
const GoogleProvider = new GoogleAuthProvider();


const SignUpWithGooglePopUp = async (setError : (msg : string) => void, login = true) => {
    try {
        console.log('we are here');
        const result = await signInWithPopup(fireBaseAuth, GoogleProvider);
        const user = result.user;
        if (!user || !user.email || !user.displayName || !user.uid) {
            throw new Error('Error creating account');
        }
        console.log('we are sening the request 1')
            console.log('we are sening the request')
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



const getAuthToken = async () : Promise<String> => {
    while (true) {
        const token = await fireBaseAuth.currentUser?.getIdToken(true);
        if (token) return token;
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

export { GoogleProvider, fireBaseAuth, SignUpWithGooglePopUp, LogInWithEmail, getAuthToken };