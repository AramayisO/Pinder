import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './password_reset.css'

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
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="formGroupEmail">
                <Form.Control
                    type="email"
                    className="PasswordReset-input"
                    placeholder="Email address"
                    value={email}
                    isInvalid={emailError}
                    onChange={e => setEmail(e.target.value)}
                />
                {emailError &&
                    <Form.Control.Feedback type="invalid">
                        {emailError}
                    </Form.Control.Feedback>
                }
            </Form.Group>
            <div className="text-center">
                <Button type="submit" className="px-4 PasswordReset-button">
                    Send password reset email
                </Button>
            </div>
        </Form>
    );
};

export default PasswordResetForm;