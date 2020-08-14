import React from 'react';
import './App.css';
import ItemContainer from './containers/ItemContainer';
import UserContainer from './containers/UserContainer';
import NavBar from './components/NavBar'
import CartContainer from './containers/CartContainer'


import { Route, Switch} from 'react-router-dom'


class App extends React.Component {

  state = {
    items: [],
    cartItems: []
    
  }

  componentDidMount() {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(items => this.setState({ items: items }))

    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(items => this.filterCartItems(items))


  }

  addCartHandler = (id) => {
    // let cartArray = [...this.state.items]
    // let foundItem = cartArray.find(item => item.id === id)
    // let updatedCart = [...this.state.cartItems, foundItem]
    // this.setState({
    //   cartItems: updatedCart
    // })
    fetch('http://localhost:3000/items/' + id, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1
        })
    })

  }   
  filterCartItems = (items) => {
    let filteredItems = items.filter(item => item.user_id === 1)
    this.setState({
      cartItems: filteredItems
    })
  }

  deleteHandler = (id) => {
    fetch('http://localhost:3000/items/' + id, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: null
      })
    })
  }
  

  render() {
    // console.log(this.state.cartItems)
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route path="/items" render={() => <ItemContainer items={this.state.items} addCartHandler={this.addCartHandler}/>} />
          <Route path="/cart" render={() => <CartContainer cartItems={this.state.cartItems} deleteHandler={this.deleteHandler}/>} />
          <UserContainer />
          <h1>our World</h1>  
        </Switch>
      </div>
    );
  }
}

export default App;
