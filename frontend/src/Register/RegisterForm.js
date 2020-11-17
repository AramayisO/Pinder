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