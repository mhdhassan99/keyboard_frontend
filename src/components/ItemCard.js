import React from 'react'
import {NavLink} from 'react-router-dom'

class ItemCard extends React.Component {


    render() {
        return (
        <div class="item-card">
           <NavLink to={`/items/${this.props.item.id}`}> <h1>{this.props.item.name}</h1> </NavLink>
            <h3>Price: ${this.props.item.price}</h3>
            <img alt="" src={this.props.item.image}/>
            <p>Category: {this.props.item.category}</p>  
        </div>
        )
    }
}

export default ItemCard