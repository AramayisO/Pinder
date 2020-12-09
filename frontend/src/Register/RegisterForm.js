import { useState } from 'react';

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
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange = {e=> setName(e.target.value)}
                        placeholder="Your Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e=> setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        value={passwordConfirm}
                        onChange = {e=> setPasswordConfirm(e.target.value)}
                        placeholder="Confirm password"
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="street">Street address</label>
                    <input
                        type="text"
                        id="street"
                        value={street}
                        onChange = {e => setStreet(e.target.value)}
                        placeholder="Street"
                    />
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange = {e => setCity(e.target.value)}
                        placeholder="City"
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="usState">State</label>
                    <input 
                        type="text"
                        id="usState"
                        value={usState}
                        onChange={e => setUsState(e.target.value)}
                        placeholder="State"
                    />
                    <lable htmlFor="zip">Zip</lable>
                    <input
                        type="text"
                        id="zip"
                        value={zip}
                        onChange={e => setZip(e.target.value)}
                        placeholder="zip"
                    />
                </div> */}
                {props.error &&
                <div className="alert alert-danger" role="alert">
                    {props.error}
                </div>
                }
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-primary px-4">
                            Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;