import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth';
import { ProfileContext } from '../profile';
import './PetMatches.css';

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
        const profiles = await profileService.getMatches(user.uid);
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
                        <Link to={`/profiles/${profile.id}`}>
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
        <AuthContext.Consumer>{(firebaseAuthService) => (
            <ProfileContext.Consumer>{(firebaseProfileService) => (
                <ProfilesList 
                    authService={firebaseAuthService}
                    profileService={firebaseProfileService}/>
            )}</ProfileContext.Consumer>
        )}</AuthContext.Consumer>        
    );
}

export default PetMatchesPage;