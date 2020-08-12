import React from 'react'

class ItemCard extends React.Component {


    render() {
        return (
            <h1>{this.props.item.name}</h1>
        )
    }
}

export default ItemCard