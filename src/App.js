import React from 'react';
import './App.css';
import ItemContainer from './containers/ItemContainer';
import UserContainer from './containers/UserContainer';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


class App extends React.Component {


  render() {

    return (
      <div className="App">
        <ItemContainer />
        <UserContainer />
        <h1>our World</h1>
      </div>
    );
  }
}

export default App;
