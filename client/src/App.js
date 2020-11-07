import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login';
import { Provider } from 'react-redux'
import store from './store'
import  { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/dashboard/CreateProfile'


import './App.css'


if(localStorage.token) {
  setAuthToken(localStorage.token)
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/create-profile' component={CreateProfile} />
          </Switch>
        </section>
      </Fragment>
    </Router>
    </Provider>
  );
};

export default App;
