import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import './App.css';

import { AuthRoute } from './common';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage'
import PasswordResetPage from './PasswordReset';

import React, { useContext, useState } from 'react';
import { AuthContext } from './auth';
import { ProfileContext } from './profile';


class ProfilesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
        };
    }

    async componentDidMount() {
        const {authService, profileService} = this.props; 
        
        const user = authService.getCurrentUser();
        const profiles = await profileService.getByUserId(user.uid);
        this.setState({
            profiles: profiles
        });
    }

    render() {
        const {profiles} = this.state;

        return (
            <ul>
                {profiles.map(profile => (
                    <li key={profile.id}>
                        <Link to={`/profiles/${profile.id}`}>
                            <img src={profile.imageUrl} width={200} />
                            <p>Name: {profile.name}</p>
                            <p>Breed: {profile.breed}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }

};

const ProfileDetailPage = () => {

    const profileService = useContext(ProfileContext);

    const [profile, setProfile] = useState(null);

    const match = useRouteMatch({
        path: '/profiles/:id',
        strict: true,
        sensitive: true
    });

    const profileId = match.params.id;

    profileService.getByProfileId(profileId)
        .then(profileObj => setProfile(profileObj))
        .catch(error => console.log(error));

    return (
        <>{profile ? (
            <>
                <img src={profile.imageUrl} width={300} />
                <p>name: {profile.name}</p>
                <p>breed: {profile.breed}</p>
            </>
        ) : (
            <p>Profile details</p>
        )
        }</>
    )
};

const UserGreeting = () => {

    const authService = useContext(AuthContext);

    const user = authService.getCurrentUser();

    return (
        <h1>Hi user { user.id }</h1>
    );
};


const CreateProfile = () => {

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const authService = useContext(AuthContext);
    const profileService = useContext(ProfileContext);

    const handleCreateProfile = (event) => {
        event.preventDefault();

        const user = authService.getCurrentUser();
        
        profileService.create(user.uid, imageFile, {name, breed})
            .then(() => console.log('Profile created'))
            .catch(error => console.log(error));
    };

    return (
        <>
            <input type="text" id="name" placeholder="Name" onChange={event => setName(event.target.value) }/>
            <input type="text" id="breed" placeholder="Breed" onChange={event => setBreed(event.target.value) }/>
            <input type="file" id="profile-pic" onChange={event => setImageFile(event.target.files[0])} />
            <button onClick={handleCreateProfile}>Create Profile</button>
        </>
    )
}


// class UserGreeting extends React.Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {

//         const authService = this.context;

//         const user = authService.getCurrentUser();

//         return (
//             <h1>Hi user { user.uid }</h1>
//         )
//     }
// }

// UserGreeting.contextType = AuthContext;


// class CreateProfile extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             name: '',
//             breed: '',
//             imageFile: null
//         };

//         this.setName = this.setName.bind(this);
//         this.setName = this.setBreed.bind(this);
//         this.setImageFile = this.setImageFile.bind(this);
//         this.handleCreateProfile = this.handleCreateProfile.bind(this);
//     }

//     setName = (event) => {
//         this.setState({
//             name: event.target.value
//         });
//     }

//     setBreed = (event) => {
//         this.setState({
//             breed: event.target.value
//         });
//     }

//     setImageFile = (event) => {
//         this.setState({
//             imageFile: event.target.files[0]
//         });
//     }

//     handleCreateProfile = (event) => {
//         event.preventDefault();

//         const {name, breed, imageFile} = this.state;
//         const {authService, profileService} = this.props;

//         const user = authService.getCurrentUser();

//         profileService.create(user.uid, imageFile, {name, breed})
//             .then(() => console.log('Profile created successfully'))
//             .catch(error => console.log(error));

//     }

//     render() {
//         return (
//             <>
//                 <input type="text" id="name" placeholder="Name" onChange={this.setName}/>
//                 <input type="text" id="breed" placeholder="Breed" onChange={this.setBreed}/>
//                 <input type="file" id="profile-pic" onChange={this.setImageFile} />
//                 <button onClick={this.handleCreateProfile}>Create Profile</button>
//             </>
//         );
//     }

// }



const Home = () => (
    <>
        <h1>Welcome to Pinder</h1>
        <UserGreeting />

        {/* Functional CreateProfile Component */}
        <br />
        <br />
        <br />
        <CreateProfile />

        {/* Class based CreateProfile Component */}
        {/* <br />
        <br />
        <br />

        <AuthContext.Consumer>{auth => (
            <ProfileContext.Consumer>{profiles => (
                
                <CreateProfile authService={auth} profileService={profiles} /> 
                
            )}</ProfileContext.Consumer>
        )}</AuthContext.Consumer> */}
        <br />
        <br />
        <br />
        <AuthContext.Consumer>{(firebaseAuthService) => (
            <ProfileContext.Consumer>{(firebaseProfileService) => (
                <ProfilesList 
                    authService={firebaseAuthService}
                    profileService={firebaseProfileService}/>
            )}</ProfileContext.Consumer>
        )}</AuthContext.Consumer>
        
    </>
);


function App() {

    return (
        <Switch>
            <AuthRoute path='/' exact={true} component={Home} />
            <AuthRoute path='/profiles' component={ProfileDetailPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/password-reset' component={PasswordResetPage} />
            <Route path='/logout' component={Logout} />
        </Switch>
    );
}

export default App;
