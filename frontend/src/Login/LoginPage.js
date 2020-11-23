import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';

import LoginForm from './LoginForm'; 
import logo from '../logo.svg';

import './login.css';

const LoginPage = (props) => {

    // Subscirbe to auth context to use auth service.
    const auth = useContext(AuthContext);
    // The useHistory hook gives access to the `history` instance that
    // can be used to navigate to different URLs.
    const history = useHistory()
    // Use this state to notify the form if login was not successful.
    const [error, setError] = useState('');

    // Gets passed to the login form to allow the login form to notify
    // the login page when the form has been submited.
    const handleLogin = async (email, password) => {
        if (!isEmailValid(email)) {
            setError('Valid email required.');
        } else if (!password) {
            setError('Password required.');
        } else {
            try {
                let user = await auth.signInWithEmailAndPassword(email, password);

                if (user) {
                    history.push('/');
                }
            } catch(error) {
                setError('Invalid email or password');
            }
        }
    }

    const isEmailValid = (email) => (
        email && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    );

    return (
        <div className="container vh-100 d-flex align-items-center">
            <div className="w-100">
                <div className="text-center">
                    <img src={logo} width="200" alt="Pinder logo" />
                    <h1>Login</h1>
                </div>
                <LoginForm onSubmit={handleLogin} error={error} />
                <div className="mt-4 text-center">
                    <span>Don't have an account? </span>
                    <Link to='/register'>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;