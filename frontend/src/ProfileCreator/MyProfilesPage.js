import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth';
import { ProfileContext } from '../profile';


const MyProfilesPage = () => {

    const authService = useContext(AuthContext)
    const profileService = useContext(ProfileContext);

    const [profiles, setProfiles] = useState([]);

    const imageDivStyle = (profile) => ({ 
        backgroundImage: `url(${profile.imageUrl})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center'
    });

    const createButtonStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#D5A6BD',
        border: '1px solid #D5A6BD',
        fontSize: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        bottom: '20px',
        right: '30px',
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        profileService.getByUserId(authService.getCurrentUser().uid)
            .then(profiles => setProfiles(profiles));
    }, [])

    return (
        <div className='container py-5' >
            <p className='h1'>Your Profiles</p>
            <hr />
            {profiles.length ?
                profiles.map(profile =>
                    <Link
                        to={`/profiles/${profile.id}`} 
                        style={{ textDecoration: 'none', color: '#212121'}}
                    >
                        <div className="card mb-3" key={profile.id}>
                            <div className="row no-gutters">
                                <div className="col-4" style={imageDivStyle(profile)}>
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{profile.name}</h5>
                                        <p className="card-text">
                                            {capitalize(profile.gender)} {capitalize(profile.breed)}
                                            <br />
                                            {profile.age} years old
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <p>You don't have any profiles yet &#9785;</p>
                )
            }
            <Link to='/create'>
                <button style={createButtonStyle}>
                    <p>+</p>
                </button>
            </Link>
        </div>
        
    )
}

export default MyProfilesPage;