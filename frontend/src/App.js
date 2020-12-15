
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthRoute } from './common';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage'
import PasswordResetPage from './PasswordReset';
import PetMatchesPage from './Matches/PetMatchesPage';
import PetDetailsPage from './Matches/PetDetailsPage';


function App() {

    return (
        <Switch>
            <AuthRoute path='/' exact={true} component={PetMatchesPage} />
            <AuthRoute path='/profiles' component={PetDetailsPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/password-reset' component={PasswordResetPage} />
        </Switch>
    );
}

export default App;
