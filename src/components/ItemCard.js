import React from 'react'
import {NavLink} from 'react-router-dom'
import './components.css';

class ItemCard extends React.Component {


    render() {
        return (
        <div className="item-card">
                <div className="item-image">
                <img alt="" className="item-card-picture" src={this.props.item.image}/>
            </div>
            <div className="item-name">
                <NavLink to={`/items/${this.props.item.id}`}> <h2>{this.props.item.name}</h2> </NavLink>
            </div>
            <h3>Price: ${this.props.item.price}</h3>
            
            <p>Category: {this.props.item.category}</p>  
            <button className="add-to-cart" onClick={() => this.props.addCartHandler(this.props.item.id)}>Add To Cart</button>
        </div>
        )
    }
}

export default ItemCard