import React from "react";
import "./components.css";
import ItemCard from "./ItemCard";

class KeyBoardShow extends React.Component {
	constructor(props) {
		super(props);
		this.keyboards = this.props.items.filter(
			(keyboard) => keyboard.category === "keyboard"
		);
	}

	getKeyboards = () => {
		return this.keyboards.map((keyboard) => (
			<ItemCard
				item={keyboard}
				key={keyboard.id}
				addCartHandler={this.props.addCartHandler}
			/>
		));
	};

	render() {
		return this.getKeyboards();
	}
}

export default KeyBoardShow;
