import React from 'react';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
        }
    }
}

export default RegisterForm;