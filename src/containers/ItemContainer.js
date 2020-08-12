import React from 'react'
import ItemCard from '../components/ItemCard'

class ItemContainer extends React.Component {
    state = {
        items: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/items')
            .then(response => response.json())
            .then(items => this.setState({ items: items }))
    }

    render() {
        let items = this.state.items.map(item => <ItemCard item={item} key={item.id} />)
        return (
            <div>
                {items}
            </div>
        )
    }

}

export default ItemContainer