import { useState } from "react";

const PasswordResetForm = (props) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);

    // Same email validation regexp used by W3C.
    const isEmailValid = (email) => (
        email && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email) {
            setEmailError('Email is required');
        } else if (!isEmailValid(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError(null);
            props.onSubmit(email);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <input 
                    type="email" 
                    id="email" 
                    className={`form-control ${emailError ? 'is-invalid' : ''}`} 
                    placeholder="Email address"
                    aria-describedby="email-validation-feedback"
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
                {emailError && (
                    <div id="email-validation-feedback" class="invalid-feedback">
                        {emailError}
                    </div>
                )}
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">Send password reset email</button>
            </div>
        </form>
    );
};

export default PasswordResetForm;