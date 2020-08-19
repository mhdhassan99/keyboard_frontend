import React from "react";
import CartShowCard from "../components/CartShowCard";

class CartContainer extends React.Component {
	state = {
		cartItems: [],
	};
	componentDidUpdate(prevProps) {
		if (this.props.cartItems.length !== prevProps.cartItems.length) {
			this.setState({ cartItems: this.props.cartItems });
		}
	}
	render() {
		let cartItem = this.props.cartItems.map((cartItem) => (
			<CartShowCard
				cartItem={cartItem}
				key={cartItem.id}
				deleteHandler={this.props.deleteHandler}
				quantityHandler={this.props.quantityHandler}
			/>
		));
		return (
			<div className="cart-container">
				<div className="cart-checkout-box">
					<p> Item Subtotal: ${this.props.cartTotal}</p>
					<p> Estimated Tax: </p>

					<button className="add-to-cart">
						{" "}
						Proceed to checkout
					</button>
				</div>
				<div className="items-container">{cartItem}</div>
			</div>
		);
	}
}

export default CartContainer;
