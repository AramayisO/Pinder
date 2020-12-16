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
            <div className='container'>
                {profiles.map(profile => (
                    <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none', color: '#212121' }}>
                        <div className="card mb-1 shadow" style={{ maxWidth: '100%' }}>
                            <div className="row no-gutters">
                                <div className="col-4">
                                    <img className="card-image" src={profile.imageUrl} alt="" width={350} />
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <div className="card-title">{profile.name}</div>
                                        <div className="card-text">{profile.breed}</div>
                                        <div className="card-text">Description Here</div>
                                    </div>
                                </div>
                            </div>
                        </div>                            
                    </Link>
                ))}
            </div>
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