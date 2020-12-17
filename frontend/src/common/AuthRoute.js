import { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth';
import VerifyEmailPage from './VerifyEmailPage';

const AuthRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);
    const location = useLocation();

    return (
        <Route {...rest} render={(props) => (
            auth.getCurrentUser()
                ? (auth.getCurrentUser().emailVerified ? <Component {...props} /> : <VerifyEmailPage {...props} />)
                : <Redirect to={ { pathname: '/login', state: { referrer: location } } } />
        )} />
    )
};

export default AuthRoute;