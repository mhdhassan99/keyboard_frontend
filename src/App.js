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
		let total = totalArr.map((item) => Number(item.price));
		let totalReduce = total.reduce(function (a, b) {
			return a + b;
		}, 0);
		this.setState({
			cartTotal: totalReduce,
		});
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
		console.log(this.state.searchValue);
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
