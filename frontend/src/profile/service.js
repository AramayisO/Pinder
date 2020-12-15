import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

class ProfileService {

    constructor() {
        this.users = firebase.firestore().collection('users');
        this.profiles = firebase.firestore().collection('profiles');
        this.images = firebase.storage().ref().child('images');
    }

    /**
     * Creates a new pet profile and saves it in the database.
     * 
     * @param {string} uid     - The unique user id of the firebase.User object. 
     * @param {File}   image   - The image file uploaded by a user.
     * @param {Object} profile - An object whose fields contain the data to be set e.g.
     *                              profile = {
     *                                  name: "Fluffy",
     *                                  breed: "Shepherd mix",
     *                                  gender: "male",
     *                                  age: 1,
     *                                  fixed: true,
     *                                  description: "I'm fluffy, smart, and want ALL of your attention.",
     *                              }
     * 
     * @returns On success, returns a resolved Promise with no value. Otherwise,
     *          returns a rejected Promise with an error value.
     */
    create = async (uid, image, profile) => {
        // Make sure that a user with the specified uid exists first.
        let user = await this.users.doc(uid).get()

        if (!user.exists) {
            return Promise.reject(`A user with uid = ${uid} does not exist.`);
        }

        // Create a new image reference with a unique id as the file name.
        // A UUID v4 is effectively guaranteed to be universally unique.
        let imageRef = this.images.child(uuidv4());

        // On successful upload, this will be an http url that can be used
        // to download the image.
        let imageUrl = null;

        // Upload the image to storage.
        try {
            await imageRef.put(image)
            imageUrl = await imageRef.getDownloadURL();
        } catch (error) {
            return Promise.reject('Unable to upload image file.');
        }

        // Save the profile to firestore.
        return this.profiles.doc().set({createdBy: uid, imageUrl, ...profile});
    }

    /**
     * Get a single pet profile by its id.
     * 
     * @param {string} id - The unique id of the profile document.
     * 
     * @returns On success, returns a resolved Promise with the profile object.
     *          Otherwise, returns a rejected Promise with an error. 
     */
    getByProfileId = async (id) => {
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
    getByUserId = async (uid) => {
        let user = await this.users.doc(uid).get();

        if (!user.exists) {
            return Promise.reject(`A user with uid = ${uid} does not exist.`);
        }

        return this.profiles
            .where('createdBy', '==', uid)
            .get()
            .then(querySnapshot => (
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            ));
    }

    /**
     * Add a new profile match for the user.
     * 
     * @param {string} uid - The users id. 
     * @param {string} pid - The profiles id.
     */
    addMatch = async (uid, pid) => {
        let user = await this.users.doc(uid).get();
        let profile = await this.profiles.doc(pid).get();

        if (!user.exists || !profile.exists) {
            return Promise.reject('User or profile does not exist');
        }

        user = user.data();
        user.matches.push(pid)

        return this.users.doc(uid).set({...user});
    }

    /**
     * Get all profiles user has matched with.
     * 
     * @param {string} uid - The users id. 
     */
    getMatches = async (uid) => {
        let user = await this.users.doc(uid).get();

        if (!user.exists) {
            return Promise.reject(`User ${uid} does not exist`);
        }

        user = user.data();

        return this.profiles
            .where(firebase.firestore.FieldPath.documentId(), 'in', user.matches)
            .get()
            .then(querySnapshot => (
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            ));
    }

    /**
     * Get profile suggesstions that can be potential matches.
     * 
     * TODO: Implement a matching algorithm. Right now, we are just returning any
     *       profile that was not created by the user and that the user has not 
     *       already matched with.
     *  
     * @param {string} uid - The users id. 
     */
    getMatchSuggestions = async (uid) => {
        let user = await this.users.doc(uid).get();

        if (!user.exists) {
            return Promise.reject(`User ${uid} does not exist`);
        }

        user = user.data();
        
        return this.profiles
            .where(firebase.firestore.FieldPath.documentId(), 'not-in', user.matches)
            .get()
            .then(querySnapshot => querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
            .then(profiles => profiles.filter(profile => profile.createdBy !== uid))
    }

};

export default ProfileService;