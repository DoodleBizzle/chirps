import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import NavBar from './NavBar';
import Chirps from './Chirps';
import Login from './Login';
import AuthProvider from './AuthProvider';

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Chirps />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;