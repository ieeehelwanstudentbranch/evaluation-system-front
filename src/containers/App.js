import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';
import Layout from '../hoc/Layout/Layout';
import { Route } from 'react-router-dom';

import CreateTask from './CreateTask/CreateTask';
import CompletedTasks from './CompletedTasks/CompletedTasks';
import PendingTasks from './PendingTasks/PendingTasks';
import Login from './Auth/Login/Login';
// import Auth from './Auth/Auth';
import Registration from './Auth/Registration/Registration';
import Logout from './Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact render={()=><p>home</p>}/>
          <Route path="/profile" render={()=><p>profile</p>}/>
          <Route path="/create-task" component={CreateTask}/>
          <Route path="/completed-tasks" component={CompletedTasks}/>
          <Route path="/pending-tasks" component={PendingTasks}/>
          <Route path="/committees" render={()=><p>Comittees</p>}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Registration}/>
        </Layout>
      </div>
    );
  }
}

export default App;
