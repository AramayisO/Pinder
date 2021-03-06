
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthRoute } from './common';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage'
import PasswordResetPage from './PasswordReset';
import PetMatchesPage from './Matches/PetMatchesPage';
import PetDetailsPage from './Matches/PetDetailsPage';
import LogoutPage from './Logout';
import Swiper from './Swiper/Swiper';
import { MyProfilesPage, ProfileCreatorPage } from './ProfileCreator';

function App() {

    return (
        <Switch>
            <AuthRoute path='/' exact={true} component={PetMatchesPage} />
            <AuthRoute exact path='/profiles' component={MyProfilesPage} />
            <AuthRoute path='/profiles/:id' component={PetDetailsPage} />
            <AuthRoute path='/find' component={Swiper} /> 
            <AuthRoute path='/create' component={ProfileCreatorPage} /> 
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/password-reset' component={PasswordResetPage} />
            <Route path='/logout' component={LogoutPage} />
        </Switch>
    );
}

export default App;
