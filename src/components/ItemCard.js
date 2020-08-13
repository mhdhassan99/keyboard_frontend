import React from 'react'
import {NavLink} from 'react-router-dom'
import './components.css';

class ItemCard extends React.Component {


    render() {
        return (
        <div className="item-card">

            <img alt="" className="item-card-picture" src={this.props.item.image}/>
            <NavLink to={`/items/${this.props.item.id}`}> <h2>{this.props.item.name}</h2> </NavLink>
             <h3>Price: ${this.props.item.price}</h3>
            
            <p>Category: {this.props.item.category}</p>  
        </div>
        )
    }
}

export default ItemCard