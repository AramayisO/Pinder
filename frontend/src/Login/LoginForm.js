import { useState } from 'react';

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
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-4">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;