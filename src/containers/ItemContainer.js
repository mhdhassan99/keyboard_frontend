import React from 'react'
import ItemCard from '../components/ItemCard'
import {Route, Switch} from 'react-router-dom'
import ItemShowPage from '../components/ItemShowPage'
import KeyBoardShow from '../components/KeyBoardShow'
import AccessoryShow from '../components/AccessoryShow'
import CartContainer from './CartContainer'

class ItemContainer extends React.Component {
    state = {
        items: [],
        cartItems: []
    }

    componentDidMount() {
    fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(items => this.setState({ items: items }))
    }
    addCartHandler = (id) => {
        let cartArray = [...this.state.items]
        let foundItem = cartArray.find(item => item.id === id)
        let updatedCart = [...this.state.cartItems, foundItem]
        this.setState({
            cartItems: updatedCart
        })
    }   

    
    render() {
        let items = this.state.items.map(item => <ItemCard item={item} key={item.id} addCartHandler={this.addCartHandler}/>)
        let cartItem = <CartContainer cartItems={this.state.cartItems} />
       
        return (
            <div>
            {this.state.items.length === 0 ? <h1>Loading...</h1> : 
            
                <Switch>
                    <Route path="/items/accessories" render={(props) => (
                        <AccessoryShow {...props} items={this.state.items} />
                    )}/>

                    <Route path="/items/keyboards" render={(props) => (
                        <KeyBoardShow {...props} items={this.state.items} /> 
                    )}/>
                    <Route path="/items/:id" render={(props) => (
                        <ItemShowPage {...props} items={this.state.items}/>
                    )}/>
                    <Route path="/items" render={() => {
                        return (
                            <div className="items-container">
                                { items }
                            </div>
                        )
                    }}/>
                </Switch>  
            }
                {cartItem}
            </div>
        )
    }
}

export default ItemContainer