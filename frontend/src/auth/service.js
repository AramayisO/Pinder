import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

class AuthService {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    createUserWithEmailAndPassword = async (email, password) => {
        return firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                this.sendEmailVerification(user);
                return user;
            });
    }

    signInWithEmailAndPassword = async (email, password) => {
        return firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => userCredential.user);
    }

    sendEmailVerification = async (user) => {
        return user.sendEmailVerification({url: 'http://localhost:3000'});
    }

    signOut = () => {
        return firebase.auth().signOut();
    }

    getCurrentUser = () => {
        return firebase.auth().currentUser;
    }
}

export default AuthService;