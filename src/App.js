import React from "react";
import "./App.css";
import ItemContainer from "./containers/ItemContainer";
import UserContainer from "./containers/UserContainer";
import NavBar from "./components/NavBar";
import CartContainer from "./containers/CartContainer";

import { Route, Switch } from "react-router-dom";

class App extends React.Component {
	state = {
		items: [],
		cartItems: [],
		cartTotal: 0,
		searchValue: "",
		quantityValue: "",
	};

	componentDidMount() {
		fetch("http://localhost:3000/items")
			.then((response) => response.json())
			.then((items) => this.setState({ items: items }));

		fetch("http://localhost:3000/items")
			.then((response) => response.json())
			.then((items) => this.filterCartItems(items));
	}
  
  filterCartItems = (items) => {
		let filteredItems = items.filter((item) => item.user_id === 1);
		this.setState({
			cartItems: filteredItems,
		});
	};
  
  quantityHandler = (e, obj) => {
		fetch("http://localhost:3000/items/" + obj, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				quantity: e.target.value,
			}),
		})
			.then((response) => response.json())
      .then((item) => {this.quantityAdjuster(item)})
      // {this.quantityAdjuster(item)})
      // console.log(this.state.cartTotal * item.quantity))
      // ("This is the cart total", this.state.cartTotal, "This is the item quantity", item.quantity))
  } // .quantityHandler

  quantityAdjuster = (item) => {
    let newArr = [...this.state.items]
    // // console.log(newArr)
    let cartItem = newArr.find(cartItem => cartItem.id === item.id)
    // console.log(cartItem)
    // console.log(cartItem.quantity, item.quantity) 3, 2
    if(item.quantity > cartItem.quantity){
      // if we are increasing the quantity
        // we want to remove the current cart value and replace it with the new one
        console.log( "The cart item quantity is greater than the item quantity")
    } else {
        console.log( "The cart item quantity is less than the item quantity")
    }
    // this.setState({cartTotal: this.state.cartTotal + (item.price * (item.quantity))-item.price})
  } // .quantityAdjuster -> NEED TO FINISH ADD MINUS CONDITIONAL

	addCartHandler = (id) => {
		fetch("http://localhost:3000/items/" + id, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				user_id: 1,
			}),
		})
			.then((response) => response.json())
			.then((updatedObj) =>
				this.setState(
					{
						cartItems: [...this.state.cartItems, updatedObj],
					},
					() => this.calculateTotal()
				)
			);
	};

	deleteHandler = (id) => {
		fetch("http://localhost:3000/items/" + id, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				user_id: null,
				quantity: "1",
			}),
		})
			.then((response) => response.json())
			.then((deleteObj) => this.filterDelete(deleteObj));
	};

	filterDelete = (deleteObj) => {
		let deletedFilter = this.state.cartItems.filter(
			(item) => item.id !== deleteObj.id
		);
		this.setState(
			{
				cartItems: deletedFilter,
			},
			() => this.calculateTotal()
		);
	};

	calculateTotal = () => {
		let totalArr = this.state.cartItems;
		let total = totalArr.map(
			(item) => Number(item.price) * Number(item.quantity)
		);

		let totalReduce = total.reduce(function (a, b) {
			return a + b;
		}, 0);
		this.setState({
			cartTotal: totalReduce,
		});
		// console.log('state', this.state.cartTotal)
	};

	changeHandler = (e) => {
		this.setState({ searchValue: e.target.value });
	};
	filterSearch = () => {
		return this.state.items.filter((item) =>
			item.name
				.toLowerCase()
				.includes(this.state.searchValue.toLowerCase())
		);
	};

	render() {
		// console.log(this.state.quantityValue)
		return (
			<div>
				<NavBar changeHandler={this.changeHandler} />
				<Switch>
					<Route
						path="/items"
						render={() => (
							<ItemContainer
								items={this.state.items}
								addCartHandler={this.addCartHandler}
								filterSearch={this.filterSearch()}
							/>
						)}
					/>
					<Route
						path="/cart"
						render={() => (
							<CartContainer
								cartItems={this.state.cartItems}
								deleteHandler={this.deleteHandler}
								cartTotal={this.state.cartTotal}
								quantityHandler={this.quantityHandler}
							/>
						)}
					/>
					<UserContainer />
					<h1>our World</h1>
				</Switch>
			</div>
		);
	}
}

export default App;
