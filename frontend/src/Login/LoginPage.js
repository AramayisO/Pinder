import React, { useContext } from 'react';
import { AuthContext } from '../auth';

import LoginForm from './LoginForm';

const LoginPage = (props) => {

    // Subscirbe to auth context to use auth service.
    const auth = useContext(AuthContext);

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
            console.log('Success: ', user);
        }
    }

    return (
        <LoginForm onSubmit={handleLogin} />
    );
};

export default LoginPage;