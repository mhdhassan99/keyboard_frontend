import React from 'react' 
import {NavLink} from 'react-router-dom'
import './components.css';
class ItemShowPage extends React.Component {

    render() {
        return (
            <div className="item-show-page">
                <NavLink to={`/items/${this.props.item.id}`}> <h1>{this.props.item.name}</h1> </NavLink>
                <h3>Price: ${this.props.item.price}</h3>
                <img class="item-show-page-picture" alt="" src={this.props.item.image} />
                <p>Category: {this.props.item.category}</p>  
                <button class="add-to-cart"> Add to cart </button>
            </div>
        )
    }
}

export default ItemShowPage