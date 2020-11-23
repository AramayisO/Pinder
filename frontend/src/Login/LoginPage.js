import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';

import LoginForm from './LoginForm';

const LoginPage = (props) => {

    // Subscirbe to auth context to use auth service.
    const auth = useContext(AuthContext);
    // The useHistory hook gives access to the `history` instance that
    // can be used to navigate to different URLs.
    const history = useHistory()

    // Gets passed to the login form to allow the login form to notify
    // the login page when the form has been submited.
    const handleLogin = async (email, password) => {
        let user = null;

        try {
            user = await auth.signInWithEmailAndPassword(email, password);
        } catch(error) {
            console.log('Error: ', error.message);
        }

        if (user) {
            history.push('/');
        }
    }

    return (
        <div className="container">
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
};

export default LoginPage;