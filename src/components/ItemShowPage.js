import React from 'react' 
import {NavLink} from 'react-router-dom'
import './components.css';
import ReactPlayer from 'react-player'
class ItemShowPage extends React.Component {
    constructor(props) {
    super (props)
        let id = parseInt(this.props.match.params.id)
        this.item = this.props.items.find((item) => item.id === id)
        
    }
    render() {
        return (
          <div>
            <div className="Grid">
              <div className="image-wrapper">
                <img
                  className="item-show-page-picture"
                  alt=""
                  src={this.item.image}
                />
              </div>
              <div className="item-show-page">
                <NavLink to={`/items/${this.item.id}`}>
                  {" "}
                  <h1>{this.item.name}</h1>{" "}
                </NavLink>
                <h3>Price: ${this.item.price}</h3>

                <p>Category: {this.item.category}</p>
                <button className="add-to-cart"> Add to cart </button>
              </div>
            </div>

            <div className="video" >
              <ReactPlayer url={this.item.video}/>
                {/* < url={this.item.video} type="video/mp4" /> */}
              
            </div>
          </div>
        );
    }
}

export default ItemShowPage