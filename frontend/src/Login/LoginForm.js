import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = (props) => {

    // Use the useState hook to hook into the React state even though
    // this is a function component.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(email, password);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            {props.error &&
                <Alert variant="danger">
                    {props.error}
                </Alert>
            }
            <div className="text-center">
                <Button type="submit" className="px-4">
                    Login
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;