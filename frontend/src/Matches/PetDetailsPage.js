import React, { useContext, useState } from 'react';
import {  useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../auth';
import { ProfileContext } from '../profile';
import './PetMatches.css';


const PetDetailPage = () => {

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
            <div className="detail-card">
                <img className="detail-image" src={profile.imageUrl} alt="" />
                <div className="detail-card-content">
                <div className="card-content-name">{profile.name}</div>
                <div className="detail-card-content">{profile.breed}</div>
                <div className="detail-card-content">More Description a a a a a a a a a a a a a More Description Here</div>
                </div>            
            </div>
        ) : (
            <p>Profile not found</p>
        )
        }</>
    )
};

function PetDetailsPage() {
    return (
        <AuthContext.Consumer>{(firebaseAuthService) => (
            <ProfileContext.Consumer>{(firebaseProfileService) => (
                <PetDetailPage
                    authService={firebaseAuthService}
                    profileService={firebaseProfileService}/>
            )}</ProfileContext.Consumer>
        )}</AuthContext.Consumer>        
    );
}
export default PetDetailsPage;