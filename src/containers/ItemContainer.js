import React from 'react'
import ItemCard from '../components/ItemCard'
import {Route, Switch} from 'react-router-dom'
import ItemShowPage from '../components/ItemShowPage'
import KeyBoardShow from '../components/KeyBoardShow'
import AccessoryShow from '../components/AccessoryShow'
import CartContainer from './CartContainer'

class ItemContainer extends React.Component {

    
    render() {
        let items = this.props.items.map(item => <ItemCard item={item} key={item.id} addCartHandler={this.props.addCartHandler}/>)
        // let cartItem = <CartContainer cartItems={this.props.cartItems} />
       
        return (
            <div>
            {this.props.items.length === 0 ? <h1>Loading...</h1> : 
            
                <Switch>
                    <Route path="/items/accessories" render={(props) => (
                        <AccessoryShow {...props} items={this.props.items} />
                    )}/>
                    <Route path="/items/keyboards" render={(props) => (
                        <KeyBoardShow {...props} items={this.props.items} /> 
                    )}/>
                    <Route path="/items/:id" render={(props) => (
                        <ItemShowPage {...props} items={this.props.items}/>
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
                {/* {cartItem} */}
            </div>
        )
    }
}

export default ItemContainer