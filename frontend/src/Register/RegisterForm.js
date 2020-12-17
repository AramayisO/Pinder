import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap'

const RegisterForm = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
/*     const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [usState, setUsState] = useState('');
    const [zip, setZip] = useState(''); */

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(email, password, passwordConfirm, name);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    value={name}
                    onChange = {e=> setName(e.target.value)}
                    placeholder="Your Name"
                />
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    id="email"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    placeholder="Email"
                />
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                    placeholder="Password"
                />
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange = {e=> setPasswordConfirm(e.target.value)}
                    placeholder="Confirm password"
                />
            </Form.Group>
            {props.error &&
                <Alert variant="danger">
                    {props.error}
                </Alert>
            }
            <div className="text-center">
                <Button type="submit" className="px-4 LoginForm-button">
                    Login
                </Button>
            </div>
        </Form>
    );
}

export default RegisterForm;