import RegisterForm from './RegisterForm';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../auth';
import { UserContext } from '../user';
import logo from '../logo.svg';

function RegisterPage(props) {

    const auth = useContext(AuthContext);
    const userDB = useContext(UserContext);
    const history = useHistory();
    const [error, setError] = useState('');

    const handleRegister = (email, password, passwordConfirm, name) => {
        if (!isEmailValid(email)) {
            setError('Valid email required.');
            console.log("Invalid email");
        }
        else if (!password) {
            setError('Password required');
        }
        else if (password !== passwordConfirm) {
            setError('Password and Password confirm do not match.');
            console.log("passwords don't match");
        } else {
            auth.createUserWithEmailAndPassword(email, password)
                .then((user) => userDB.setUserData(user.uid, {email:email, name:name, matches: []}))
                .then(user => history.push('/'))
                .catch(error => {
                    setError(`Error:${error.message}`);
                });
        }
    };

    const isEmailValid = (email) => (
        email && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    );

    return (
        <div className="container vh-100 d-flex align-items-center">
            <div className="w-100">
                <div className="text-center">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} width="200" alt="Pinder logo" />
                    <h1>Register</h1>
                </div>
                <RegisterForm onSubmit={handleRegister} error={error} />
                <div className="mt-4 text-center">
                    <span>Already have an account?</span>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    );
}
export default RegisterPage;