import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'normalize.css';
import './App.scss';
import Layout from '../hoc/Layout/Layout';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';

import HomeApp from './Home/Home';
import CreateTask from './CreateTask/CreateTask';
import CompletedTasks from './CompletedTasks/CompletedTasks';
import PendingTasks from './PendingTasks/PendingTasks';
import Committees from './Committees/Comittees';
import SingleCommittee from './Committees/SingleCommittee/SingleCommittee';
import Logout from './Auth/Logout/Logout';
import * as actions from '../store/actions/index';
import SinglePost from '../components/Post/SinglePost/SinglePost';
import SingleProfile from './SingleProfile/SingleProfile';
import SingleTask from './SingleTask/SingleTask';
import DeliverTask from './DeliverTask/DeliverTask';
import PublicLayout from '../hoc/PublicLayout/PublicLayout';
import NotFound from '../components/404/404';
import Verify from './Verify/Verify';

import Home from './PublicHome/Home';
import PrivateRouter from '../components/PrivateRoute/PrivateRoute';


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div className="App">
        {
          this.props.isAuthenticated?
          <Layout>
            <Switch>
              <PrivateRouter path='/home' exact={true} component={HomeApp} isAuthenticated={this.props.isAuthenticated}/>
              <PrivateRouter path={"/post/:id"} isAuthenticated={this.props.isAuthenticated} component={SinglePost} />
              
              <PrivateRouter path="/task/:id" isAuthenticated={this.props.isAuthenticated} component={SingleTask} />
              <PrivateRouter path="/create-task" isAuthenticated={this.props.isAuthenticated} component={CreateTask}/>
              <PrivateRouter path="/deliver-task/:id" isAuthenticated={this.props.isAuthenticated} component={DeliverTask}/>
              <PrivateRouter path="/pending-tasks" isAuthenticated={this.props.isAuthenticated} component={PendingTasks}/>
              <PrivateRouter path="/completed-tasks" isAuthenticated={this.props.isAuthenticated} component={CompletedTasks}/>
              
              <PrivateRouter path="/committees" isAuthenticated={this.props.isAuthenticated} component={Committees}/>
              <PrivateRouter path="/committee/:id" isAuthenticated={this.props.isAuthenticated} component={SingleCommittee} />

              <PrivateRouter path="/user/:id" isAuthenticated={this.props.isAuthenticated} component={SingleProfile}/>
              <PrivateRouter path="/logout" isAuthenticated={this.props.isAuthenticated} component={Logout}/>
              <Route path="/verify/:code" component={Verify}/>
              <Redirect exact from="/" to="/home" />
              <Route path="*"  component={NotFound} />
            </Switch>
          </Layout>
          :<PublicLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Home} />
              <Route path="/registration" component={Home} />
              <Route path="/verify/:code" component={Verify}/>
              <Redirect exact from="/home" to="/" />
              <Route path="*"  component={NotFound} />
            </Switch>
          </PublicLayout>
        }
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