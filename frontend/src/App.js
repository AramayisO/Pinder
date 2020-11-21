import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import { AuthContext } from './auth';
import LoginPage from './Login/LoginPage';

function App() {

    const auth = useContext(AuthContext);

    return (
        <Switch>
            <Route path='/' exact={true} render={() => (<h1>Welcome to Pinder</h1>)} />
            <Route path='/login' component={LoginPage} /> 
        </Switch>
    );
}

export default App;
