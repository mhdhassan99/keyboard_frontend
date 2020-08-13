import React from 'react'
import ItemCard from '../components/ItemCard'
import {Route, Switch} from 'react-router-dom'
import ItemShowPage from '../components/ItemShowPage'

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
            {this.state.items.length === 0 ? <h1>Loading</h1> : 
            
                <Switch>
                    <Route path="/items/:id" render={({match}) => {
                        let id = parseInt(match.params.id)
                        let foundItems = this.state.items.find((item) => item.id === id)
                            return <ItemShowPage item={foundItems}/>
                    }}/>
                    <Route path="/items" render={() => {
                        return (
                            <div className="items-container">
                                { items }
                            </div>
                        )
                    }}/>
                </Switch>
            }
            </div>
        )
    }
}

export default ItemContainer