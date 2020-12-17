import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import {  useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../auth';
import { ProfileContext } from '../profile';
import './PetMatches.css';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow" style={{ width: '18rem' }}>
                    <img className="card-img-top" src={profile.imageUrl} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{profile.name}</h5>
                        <p className="card-text">
                            {capitalize(profile.breed)}
                            <br />
                            {capitalize(profile.gender)}
                            <br />
                            {profile.age} years old
                        </p>
                        <p className='card-ext small'>
                            {profile.bio}
                        </p>
                    </div>            
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