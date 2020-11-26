import { useContext, useState } from 'react';
import PasswordResetForm from './PasswordResetForm';
import { AuthContext } from '../auth';
import { Link } from 'react-router-dom';

const PasswordResetPage = (props) => {

    // Get access to the auth service instance.
    const auth = useContext(AuthContext);

    // Use state to render different components depending on whether reset
    // email was sent or not.
    const [status, setStatus] = useState({sent: false});

    // Render prompt and form to input email.
    const CardBodyNotSent = () => (
        <>
            <p className="card-text text-center">Enter your email and we'll send you a link to reset your password.</p>
            <PasswordResetForm onSubmit={sendResetEmail}/>
            <div className="text-center mt-4">
                <Link to="/register">Create an account</Link>
            </div>
            <div className="text-center mt-2">
                <Link to="/login">Login instead</Link>
            </div>
        </>
    );
    
    // Render result after reset email is sent and link to go back to login page.
    const CardBodySent = () => (
        <>
            <p className="card-text text-center">Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
            <div className="text-center">
                <Link to="/login">Back to login</Link>
            </div>
        </>
    );

    // Loading spinner 
    const Spinner = () => (
        <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )

    // Use the auth service to send the password reset email and update state.
    const sendResetEmail = (email) => {
        setStatus({sending: true});

        auth.sendPasswordResetEmail(email)
            .then(() => {
                setStatus({
                    sent: true,
                    sending: false
                });
            })
            .catch((error) => {
                setStatus({
                    sent: true,
                    sending: false
                });
            });
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title text-center">Reset Your Password</h5>
                    {!status.sent && !status.sending && <CardBodyNotSent />}
                    {status.sent && <CardBodySent />}
                    {status.sending && <Spinner />}
                </div>
            </div>
        </div>
    );
};

export default PasswordResetPage;