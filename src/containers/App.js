import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'normalize.css';
import './App.scss';
import Layout from '../hoc/Layout/Layout';
import { Route, withRouter } from 'react-router-dom';

import Home from './Home/Home.jsx';
import CreateTask from './CreateTask/CreateTask.jsx';
import CompletedTasks from './CompletedTasks/CompletedTasks';
import PendingTasks from './PendingTasks/PendingTasks';
import Committees from './Committees/Comittees.jsx';
import SingleCommittee from './Committees/SingleCommittee/SingleCommittee';
import Login from './Auth/Login/Login';
import Registration from './Auth/Registration/Registration';
import Logout from './Auth/Logout/Logout';
import * as actions from '../store/actions/index';
import SinglePost from '../components/Post/SinglePost/SinglePost.jsx';
import SingleProfile from './SingleProfile/SingleProfile.jsx';
import SingleTask from './SingleTask/SingleTask.jsx';


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        {/* <Redirect to="/login" /> */}
      </>
    );
    if (this.props.isAuthenticated){
      routes = (
        <>
          <Route path="/" exact component={Home}/>
          <Route path="/user/:id" component={SingleProfile}/>
          <Route path="/create-task" component={CreateTask}/>
          <Route path="/completed-tasks" component={CompletedTasks}/>
          <Route path="/pending-tasks" component={PendingTasks}/>
          <Route path="/committees" component={Committees}/>
          <Route path="/logout" component={Logout}/>
          <Route path={"/post/:id"} component={SinglePost} />
          <Route path={"/task/:id"} component={SingleTask} />
          <Route path={"/committee/:id"} component={SingleCommittee} />
          {/* <Redirect to="/" /> */}
        </>
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