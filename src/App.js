import React from 'react';
import './App.css';
import ItemContainer from './containers/ItemContainer';
import UserContainer from './containers/UserContainer';
import NavBar from './components/NavBar'
import CartContainer from './containers/CartContainer'


import { Route, Switch} from 'react-router-dom'


class App extends React.Component {


  render() {

    return (
      <div>
        <NavBar/>
        <Switch>
          <Route path="/items" render={() => <ItemContainer />}/>
          <Route path="/cart" render={() => <CartContainer />} />
          <UserContainer />
          <h1>our World</h1>  
        </Switch>
      </div>
    );
  }
}

export default App;
