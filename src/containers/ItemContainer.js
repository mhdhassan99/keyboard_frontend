import React from 'react'
import ItemCard from '../components/ItemCard'
import {Route, Switch} from 'react-router-dom'

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
        console.log(this.state)
        let items = this.state.items.map(item => <ItemCard item={item} key={item.id} />)
        return (
            <div>
            <Switch>
                <Route path="/items"/>
                <Route path="/items" render={() => {
                    return (
                        <>
                            { items }
                        </>
                    )
                }}/>
            </Switch>
            </div>
        )
    }
}

export default ItemContainer