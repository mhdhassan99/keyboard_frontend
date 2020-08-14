import React from 'react' 
import ItemCard from '../components/ItemCard'
import { Route, Switch } from 'react-router-dom'
import ItemShowPage from '../components/ItemShowPage'
import KeyBoardShow from '../components/KeyBoardShow'
import AccessoryShow from '../components/AccessoryShow'
import CartShowCard from '../components/CartShowCard'

class CartContainer extends React.Component {  
    state = {
        cartItems: []
    }
    componentDidUpdate(prevProps){
        if (this.props.cartItems.length !== prevProps.cartItems.length) {
            this.setState({ cartItems: this.props.cartItems })
        }
    }
    render () {
        let cartItem = this.state.cartItems.map(cartItem => <CartShowCard cartItem={cartItem} key={cartItem.id}/>)
        return (
            <div>
                <h1>Cart</h1>
                {cartItem}
            </div>
        )
    }
}

export default CartContainer