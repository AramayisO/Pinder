import { Switch, Link } from 'react-router-dom';
import React from 'react';
import { AuthContext } from '../auth';
import { ProfileContext } from '../profile';
import './PetMatches.css';
//import { Link, useRouteMatch } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';
//import { AuthRoute } from '../common';
//import PetDetailsPage from './PetDetailsPage';

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
            <>
                {profiles.map(profile => (
                    <li key={profile.id}>
                        {/* <Link to={`/profiles/${profile.id}`}> */}
                        <Link to={`/PetDetailsPage/${profile.id}`}>
                            {/* <img src={profile.imageUrl} width={200} alt=""/>
                            <p>Name: {profile.name}</p>
                            <p>Breed: {profile.breed}</p> */}
                            <div className="card">
                                <img className="card-image" src={profile.imageUrl} alt="" width={200}/>
                                <div className="card-content">
                                    <div className="card-content-name">{profile.name}</div>
                                    <div className="card-content">{profile.breed}</div>
                                    <div className="card-content">Description Here</div>
                                </div>
                            </div>                            
                        </Link>
                    </li>
                ))}
            </>
        )
    }

};

function PetMatchesPage() {
    return (
        <>
        <AuthContext.Consumer>{(firebaseAuthService) => (
            <ProfileContext.Consumer>{(firebaseProfileService) => (
                <ProfilesList 
                    authService={firebaseAuthService}
                    profileService={firebaseProfileService}/>
            )}</ProfileContext.Consumer>
        )}</AuthContext.Consumer>        
        <Switch>
            {/* <AuthRoute path='/' exact={true} component={Home} /> */}
            {/* <AuthRoute path='/profiles' component={ProfileDetailPage} /> */}
            {/* <Route path='/login' component={LoginPage} /> */}
            {/* <Route path='/register' component={RegisterPage} /> */}
            {/* <Route path='/password-reset' component={PasswordResetPage} /> */}
            {/* <Route path='/Matches' component={PetMatchesPage} /> */}
        </Switch>
        </>
    );
}

export default PetMatchesPage;


// const UserGreeting = () => {

//     const authService = useContext(AuthContext);

//     const user = authService.getCurrentUser();

//     return (
//         <h1>Hi user { user.id }</h1>
//     );
// };

// const Button = withRouter(({ history }) => (
//     <button
//       type='button'
//       onClick={() => { history.push('/Matches/PetMatchesPage') }}
//     >
//       Matches Page!
//     </button>
//   ))

// const CreateProfile = () => {

//     const [name, setName] = useState('');
//     const [breed, setBreed] = useState('');
//     const [imageFile, setImageFile] = useState(null);

//     const authService = useContext(AuthContext);
//     const profileService = useContext(ProfileContext);

//     const handleCreateProfile = (event) => {
//         event.preventDefault();

//         const user = authService.getCurrentUser();
        
//         profileService.create(user.uid, imageFile, {name, breed})
//             .then(() => console.log('Profile created'))
//             .catch(error => console.log(error));
//     };
//     return (
//         <>
//             <input type="text" id="name" placeholder="Name" onChange={event => setName(event.target.value) }/>
//             <input type="text" id="breed" placeholder="Breed" onChange={event => setBreed(event.target.value) }/>
//             <input type="file" id="profile-pic" onChange={event => setImageFile(event.target.files[0])} />
//             <button onClick={handleCreateProfile}>Create Profile</button>
//         </>
//     )
// }



// const Home = () => (
//     <>
//         {/* <h1>Welcome to Pinder</h1> */}
//         {/* <UserGreeting /> */}

//         {/* Functional CreateProfile Component */}
//         <br />

//         <br />
//         <br />
//         {/* <CreateProfile /> */}
//         {/* <Button /> */}
//         {/* Class based CreateProfile Component */}
//         {/* <br />
//         <br />
//         <br />

//         <AuthContext.Consumer>{auth => (
//             <ProfileContext.Consumer>{profiles => (
                
//                 <CreateProfile authService={auth} profileService={profiles} /> 
                
//             )}</ProfileContext.Consumer>
//         )}</AuthContext.Consumer> */}
//         <br />
//         <br />
//         <br />
//         <AuthContext.Consumer>{(firebaseAuthService) => (
//             <ProfileContext.Consumer>{(firebaseProfileService) => (
//                 <ProfilesList 
//                     authService={firebaseAuthService}
//                     profileService={firebaseProfileService}/>
//             )}</ProfileContext.Consumer>
//         )}</AuthContext.Consumer>
        
//     </>
// );

// const ProfileDetailPage = () => {

//     const profileService = useContext(ProfileContext);

//     const [profile, setProfile] = useState(null);

//     const match = useRouteMatch({
//         path: '/profiles/:id',
//         strict: true,
//         sensitive: true
//     });

//     const profileId = match.params.id;

//     profileService.getByProfileId(profileId)
//         .then(profileObj => setProfile(profileObj))
//         .catch(error => console.log(error));

//     return (
//         <>{profile ? (
//             <>
//                 <img src={profile.imageUrl} width={300} alt="" />
//                 <p>name: {profile.name}</p>
//                 <p>breed: {profile.breed}</p>
//             </>
//         ) : (
//             <p>Profile details</p>
//         )
//         }</>
//     )
// };
