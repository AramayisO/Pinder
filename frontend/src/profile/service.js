import firebase from 'firebase';

class ProfileService {

    constructor() {
        this.users = firebase.firestore().collection('users');
        this.profiles = firebase.firestore().collection('profiles');
    }

    /**
     * 
     * @param {*} uid 
     * @param {*} profile 
     */
    createProfile = async (uid, profile) => {
        let user = await this.users.doc(uid).get()

        if (!user.exists) {
            return Promise.reject(`A user with uid = ${uid} does not exist.`);
        }

        return this.profiles.doc().set({ createdBy: uid, ...profile }, { merge: true });
    }

    /**
     * 
     * @param {*} id 
     */
    getProfile = async (id) => {
        return this.profiles.doc(id).get()
            .then((docSnapshot) => docSnapshot.data());
    }

    /**
     * 
     * @param {*} uid 
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