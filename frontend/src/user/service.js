import firebase from 'firebase';

class UserService {

    constructor() {
        this.collection = firebase.firestore().collection('users');
    }

    /**
     * Writes data to the users document.
     * 
     * If the user does not exist, it will be created. Otherwise, the data
     * will be overwritten.
     * 
     * The method call will only replace the values specified in the data
     * object. Fields omitted from the data object will remain untouched.
     * 
     * @param {string} uid - The unique user id of the firebase.User object.
     * @param {Object} data - An object whose fields contain the data to be set.
     * 
     * @returns On success, returns a resolved Promise with no value. Otherwise,
     *          returns a rejected Promise with an error value.
     */
    setUserData = async (uid, data) => {
        if (data.coords) {
            const {latitude, longitude} = data.coords;
            data = {...data, coords: new firebase.firestore.GeoPoint(latitude, longitude)};
        }
        return this.collection.doc(uid).set({...data}, {merge: true});
    }

    /**
     * Gets the data from the users document.
     * 
     * @param {string} uid - The unique user id of the firebase.User object.
     * 
     * @returns Returns a Promise containing a data object with all the fields
     *          in the user's document. Otherwise, returns a rejected Promise
     *          containing an error. 
     */
    getUserData = async (uid) => {
        return this.collection.doc(uid).get()
            .then((docSnapshot) => docSnapshot.data());
    }
};

export default UserService;