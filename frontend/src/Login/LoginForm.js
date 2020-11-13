import React from 'react';
import PropTypes from 'prop-types'

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleEmailChange(event) {
        event.preventDefault();
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        event.preventDefault();
        this.setState({password: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();

        console.log('email: ', this.state.email)
        console.log('password: ', this.state.password)
        
        this.setState({
            email: '',
            password: '',
        });
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
                        <input type="email" 
                               className="form-control" 
                               id="email" 
                               value={this.state.email} 
                               onChange={this.handleEmailChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                               className="form-control"
                               id="password" 
                               value={this.state.password}
                               onChange={this.handlePasswordChange}/>
                    </div>
                    <div className="text-center">
                        <button type="submit" 
                                className="btn btn-primary px-4"
                                style={buttonStyle}>{buttonText}</button>
                    </div>
                </form>
            </div>
        )
    }
}

LoginForm.propTypes = {
    buttonText: PropTypes.string.isRequired,
};

export default LoginForm;