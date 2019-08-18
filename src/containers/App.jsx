import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'normalize.css';
import './App.scss';
import Layout from '../hoc/Layout/Layout';
import { Route, withRouter, Switch } from 'react-router-dom';

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

import Home from './PublicHome/Home';


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <>
        {/* <Redirect to="/login" /> */}
      </>
    );
    if (this.props.isAuthenticated){
      routes = (
        <>
          <Route path="/app" exact component={HomeApp}/>
          <Route path="/user/:id" component={SingleProfile}/>
          <Route path="/create-task" component={CreateTask}/>
          <Route path="/completed-tasks" component={CompletedTasks}/>
          <Route path="/pending-tasks" component={PendingTasks}/>
          <Route path="/committees" component={Committees}/>
          <Route path="/logout" component={Logout}/>
          <Route path={"/post/:id"} component={SinglePost} />
          <Route path={"/task/:id"} component={SingleTask} />
          <Route path={"/committee/:id"} component={SingleCommittee} />
          <Route path={"/deliver-task/:id"} component={DeliverTask}/>
          <Route exact path="/" component={Home} />
          {/* <Redirect to="/" /> */}
        </>
      )
    }
    return (
      <div className="App">
        {
          this.props.isAuthenticated?
          <Layout>
            {routes}
          </Layout>
          :<PublicLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Home} />
              <Route path="/registration" component={Home} />
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