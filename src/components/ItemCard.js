import React from 'react'

class ItemCard extends React.Component {


    render() {
        return (
        <div>
            <h1>{this.props.item.name}</h1>
            <h3>Price: ${this.props.item.price}</h3>
            <img alt="" src={this.props.item.image}/>
            <p>Category: {this.props.item.category}</p>
            
        </div>
        )
    }
}

export default ItemCard