import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'normalize.css';
import './App.scss';
import Layout from '../hoc/Layout/Layout';
import { Route, withRouter, Redirect,Switch } from 'react-router-dom';

import Home from './Home/Home';
import CreateTask from './CreateTask/CreateTask';
import CompletedTasks from './CompletedTasks/CompletedTasks';
import PendingTasks from './PendingTasks/PendingTasks';
import Committees from './Committees/Comittees';
import Login from './Auth/Login/Login';
import Registration from './Auth/Registration/Registration';
import Logout from './Auth/Logout/Logout';
import * as actions from '../store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Redirect to="/login" />
      </Switch>
    );
    if (this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/profile" render={()=><p>profile</p>}/>
          <Route path="/create-task" component={CreateTask}/>
          <Route path="/completed-tasks" component={CompletedTasks}/>
          <Route path="/pending-tasks" component={PendingTasks}/>
          <Route path="/committees" component={Committees}/>
          <Route path="/logout" component={Logout}/>
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.login.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.loginCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));