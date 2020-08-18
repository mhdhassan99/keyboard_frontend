import React from 'react'
import './components.css';
import ItemCard from './ItemCard'


class AccessoryShow extends React.Component {
    constructor(props) {
        super(props)
        this.accessories = this.props.items.filter(accessory => accessory.category === 'accessory')
    }
    
    getAccessory = () => {
        return this.accessories.map(accessory => <ItemCard item={accessory} key={accessory.id} addCartHandler={this.props.addCartHandler}/>)
    }

    render() {
        return (
            this.getAccessory()
        )
    }
}
export default AccessoryShow