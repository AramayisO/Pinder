import { Switch, Route } from 'react-router-dom';
import './App.css';

import { AuthRoute } from './common';
import LoginPage from './Login/LoginPage';
import PasswordResetPage from './PasswordReset';

const Home = () => (<h1>Welcome to Pinder</h1>);

function App() {

    return (
        <Switch>
            <AuthRoute path='/' exact={true} component={Home} />
            <Route path='/login' component={LoginPage} /> 
            <Route path='/password-reset' component={PasswordResetPage} />
        </Switch>
    );
}

export default App;
