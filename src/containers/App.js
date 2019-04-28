import React, { Component } from 'react';
import 'normalize.css';
import './App.scss';

import Layout from '../hoc/Layout/Layout';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact render={()=><p>home</p>}/>
          <Route path="/profile" render={()=><p>profile</p>}/>
          <Route path="/create-task" render={()=><p>Create Task</p>}/>
          <Route path="/completed-tasks" render={()=><p>Completed Tasks</p>}/>
          <Route path="/pending-tasks" render={()=><p>Pending Tasks</p>}/>
          <Route path="/committees" render={()=><p>Comittees</p>}/>
          <Route path="/login" render={()=><p>login</p>}/>
          <Route path="/registration" render={()=><p>Registration</p>}/>
        </Layout>
      </div>
    );
  }
}

export default App;
