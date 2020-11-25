import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth';
import VerifyEmailPage from './VerifyEmailPage';

const AuthRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => (
            auth.getCurrentUser()
                ? (auth.getCurrentUser().emailVerified ? <Component {...props} /> : <VerifyEmailPage {...props} />)
                : <Redirect to='/login' />
        )} />
    )
};

export default AuthRoute;