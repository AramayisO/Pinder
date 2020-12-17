import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../auth';
import { ProfileContext } from '../profile';
import ProfileCreatorForm from './ProfileCreatorForm';

const ProfileCreatorPage = () => {

    const authService = useContext(AuthContext);
    const profileService = useContext(ProfileContext);

    return (
        <Container fluid="sm" className="py-5">
            <div className='text-center'>
                <img src={`${process.env.PUBLIC_URL}/logo.png`} width={200}/>
                <h1>Create a Profile</h1>
            </div>
            <ProfileCreatorForm
                user={authService.getCurrentUser()}
                onSubmit={profileService.create}
            />
        </Container>
    )
};

export default ProfileCreatorPage;