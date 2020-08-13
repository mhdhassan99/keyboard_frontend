import React from 'react' 
import ItemCard from '../components/ItemCard'
import { Route, Switch } from 'react-router-dom'
import ItemShowPage from '../components/ItemShowPage'
import KeyBoardShow from '../components/KeyBoardShow'
import AccessoryShow from '../components/AccessoryShow'

class CartContainer extends React.Component {
    state = {
        cartItems: []
    }
    currentCart = () => {
        this.setState({
            cartItems: [...this.props.cartItems]
        })
    }
    render () {
        console.log(this.state.cartItems)
        return (
            <h1>Cart</h1>
        )
    }
}

export default CartContainer