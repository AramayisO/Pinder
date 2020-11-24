import firebase from 'firebase';

class AuthService {
    
    constructor() {
        firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => console.log('Auth: persistence = LOCAL'))
            .catch((error) => console.log(error));
    }

    /**
     * Creates a new user account with the specified email and password.
     * 
     * On successful creation of the user account, this user will be signed in
     * to the application and a verification email will be sent to the users
     * email address.
     * 
     * @param {string} email - The user's email address.
     * @param {string} password - The user's chosen password.
     * 
     * @returns If successful, returns a resolved Promise with the value of
     *          the firebase.User created. Otherwise, returns a rejected
     *          Promise with a value of firebase.auth.Error. 
     */
    createUserWithEmailAndPassword = async (email, password) => {
        return firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                this.sendEmailVerification(user);
                return user;
            });
    }

    /**
     * Signs in user with the specified email and password.
     * 
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * 
     * @returns If successful, returns a resolved Promise with the value of
     *          firebase.User. Otherwise, returns a rejected Promise with a
     *          value of firebase.auth.Error.
     */
    signInWithEmailAndPassword = async (email, password) => {
        return firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => userCredential.user);
    }

    /**
     * Sends a verification email to a user.
     * 
     * @param {firebase.User} user - The user with the email to be verified.
     * 
     * @returns If successful, returns a Promise<void>. Otherwise, returns a
     *          Promise<firebase.auth.Error>.
     */
    sendEmailVerification = async (user) => {
        return user.sendEmailVerification({url: 'http://localhost:3000'});
    }

    /**
     * Sends a password reset email to the specified email.
     * 
     * @param {string} email - The email address with the password to be reset.
     * 
     * @returns If successful, returns a Promise<void>. Otherwise, returns a
     *          Promise<firebase.auth.Error>. 
     */
    sendPasswordResetEmail = async (email) => {
        return firebase.auth().sendPasswordResetEmail(email, {url: 'http://localhost:3000'});
    }

    /**
     * Signs out the currently signed-in user.
     */
    signOut = () => {
        return firebase.auth().signOut();
    }

    /**
     * Returns the currently signed-in user (null if no signed in user).
     */
    getCurrentUser = () => {
        return firebase.auth().currentUser;
    }
}

export default AuthService;