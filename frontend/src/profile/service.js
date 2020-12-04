import firebase from 'firebase';

class ProfileService {

    constructor() {
        this.users = firebase.firestore().collection('users');
        this.profiles = firebase.firestore().collection('profiles');
    }

    /**
     * Creates a new pet profile and saves it in the database.
     * 
     * @param {string} uid - The unique user id of the firebase.User object. 
     * @param {Object} profile - An object whose fields contain the data to be set e.g.
     *                              profile = {
     *                                  name: "Fluffy",
     *                                  breed: "Shepherd mix",
     *                                  gender: "male",
     *                                  age: 1,
     *                                  fixed: true,
     *                                  quote: "I'm fluffy, smart, and want ALL of your attention.",
     *                              }
     * 
     * @returns On success, returns a resolved Promise with no value. Otherwise,
     *          returns a rejected Promise with an error value.
     */
    createProfile = async (uid, profile) => {
        let user = await this.users.doc(uid).get()

        if (!user.exists) {
            return Promise.reject(`A user with uid = ${uid} does not exist.`);
        }

        return this.profiles.doc().set({ createdBy: uid, ...profile }, { merge: true });
    }

    /**
     * Get a single pet profile by its id.
     * 
     * @param {string} id - The unique id of the profile document.
     * 
     * @returns On success, returns a resolved Promise with the profile object.
     *          Otherwise, returns a rejected Promise with an error. 
     */
    getProfile = async (id) => {
        return this.profiles.doc(id).get()
            .then(docSnapshot => ({ id: docSnapshot.id, ...docSnapshot.data() }));
    }

    /**
     * Get all profiles created by a user.
     * 
     * @param {string} uid - The unique user id of the firebase.User object.
     * 
     * @returns On success, returns a resovled Promise with an array of profile
     *          objects. Otherwise, returns a rejected Promise with an error.
     */
    getProfilesCreatedByUser = async (uid) => {
        let user = await this.users.doc(uid).get();

        if (!user.exists) {
            return Promise.reject(`A user with uid = ${uid} does not exist.`);
        }

        return this.profiles
            .where('createdBy', '==', uid)
            .get()
            .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
    }

};

export default ProfileService;