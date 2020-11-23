import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth';

const AuthRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => (
            auth.getCurrentUser()
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
};

export default AuthRoute;