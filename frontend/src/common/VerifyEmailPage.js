import { useContext, useState } from "react";
import { AuthContext } from "../auth";

const VerifyEmailPage = (props) => {
    const auth = useContext(AuthContext);
    const [status, setStatus] = useState(null);

    const handleClick = (event) => {
        event.preventDefault();

        // Start spinner
        setStatus({
            inProgress: true 
        });

        // Once email is sent successfully or with error, stop showing spinner
        // and show the appropriate message.
        auth.sendEmailVerification(auth.getCurrentUser())
            .then(() => {
                setStatus({
                    inProgress: false,
                    success: true
                });
            })
            .catch((error) => {
                setStatus({
                    inProgress: false,
                    error: true
                });
            });
    }

    const Spinner = () => <div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>;
    const SuccessMessage = () => <div class="alert alert-success" role="alert">Verification email sent!</div>;
    const ErrorMessage = () => <div class="alert alert-danger" role="alert">Unable to send email. Please try again later.</div>;

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card text-center shadow">
                <div className="card-body">
                    <h5 className="card-title">Please verify your email</h5>
                    <p className="card-text">You're almost there! We sent an email to <strong>{auth.getCurrentUser().email}</strong></p>
                    <p className="card-text">If you don't see the email, please <strong>check your spam folder</strong>.</p>
                    <p className="card-text">Still can't find the email?</p>
                    {status 
                        ? ((status.inProgress && <Spinner />) || (status.success && <SuccessMessage />) || (status.error && <ErrorMessage />))
                        : <button className="btn btn-primary" onClick={handleClick}>Resend Email</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;