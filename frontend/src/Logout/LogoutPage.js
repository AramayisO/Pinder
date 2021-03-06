import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';

const LogoutPage = (props) => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("Logging out");
        auth.signOut()
            .then(history.push('/login'))
            .catch(error => setError("Error logging out"));
        });

        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
}

export default LogoutPage;