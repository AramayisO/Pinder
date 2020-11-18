import React from 'react';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            name: '',
            zip: '',
            city: '',
            street: '',
            usState: '',
        }
    }

    render() {
        const {buttonText, textColor, accentColor} = this.props;

        const formStyle = {
            color: textColor,
        };

        const buttonStyle = {
            backgroundColor: accentColor,
            borderColor: accentColor,
            color: textColor,
        };

        return (
            <div className="container">
                <form style={formStyle} onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={this.email}
                            onChange={this.handleEmailChange}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={this.password}
                            onChange={this.handlePasswordChange}
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            value={this.password}
                            onChange={this.handlePasswordConfirmChange}
                            placeholder="Confirm password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">Street address</label>
                        <input
                            type="text"
                            id="street"
                            value={this.street}
                            onChange={this.handleStreetChange}
                            placeholder="Street"
                        />
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            value={this.city}
                            onChange={this.handleCityChange}
                            placeholder="City"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="usState">State</label>
                        <input 
                            type="text"
                            id="usState"
                            value={this.usState}
                            onChange={this.handleStateChange}
                            placeholder="State"
                        />
                        <lable htmlFor="zip">Zip</lable>
                        <input
                            type="text"
                            id="zip"
                            value={this.zip}
                            onChange={this.handleZipChange}
                            placeholder="zip"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary px-4"
                            style={buttonStyle}>
                                {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterForm;