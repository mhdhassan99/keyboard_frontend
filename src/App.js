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
	} // .componentDidMount // initializes state.item && sends to .filterCartItems(items)

	filterCartItems = (items) => {
		let filteredItems = items.filter((item) => item.user_id === 1);
		this.setState({
			cartItems: filteredItems,
		});
	}; // .filterCartItems(items) // items from .componentDidMount // sets this.state.cartItems

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
			.then((item) => {
				this.quantityAdjuster(item);
			});
	}; // .quantityHandler(e, obj) // (e, obj) from ./components/CartShowCard/onChange

	quantityAdjuster = (item) => {
		let newArr = [...this.state.items];
		let cartItem = newArr.find((cartItem) => cartItem.id === item.id);
		let cartItemFilter = newArr.filter(
			(cartItem) => cartItem.id !== item.id
		);
		let updateArr = [...cartItemFilter, item];
		let newValue =
			this.state.cartTotal -
			cartItem.price * cartItem.quantity +
			item.price * item.quantity;

		this.setState({ cartTotal: newValue, items: updateArr });
	}; // .quantityAdjuster(item) // item from .quantityHandler(e, obj)

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
	}; // .addCartHandler(id) // (id) from ./components/keyBoardShow/.keyBoards

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
	}; // .deleteHandler(id) // (id) from ./components/CartShowCard/onClick

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
	}; // .filterDelete(deleteObj) // (deleteObj) from .deleteHandler(id)

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
	}; // .calculateTotal // called by .filterDelete && .addCartHandler

	changeHandler = (e) => {
		this.setState({ searchValue: e.target.value });
	}; // .changeHandler(e) // (e) from ./components/NavBar/search

	filterSearch = () => {
		return this.state.items.filter((item) =>
			item.name
				.toLowerCase()
				.includes(this.state.searchValue.toLowerCase())
		);
	}; // .filterSearch // props to ./containers/ItemContainer

	render() {
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
