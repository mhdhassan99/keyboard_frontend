import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
function NavBar(props) {
	return (
		<ul>
			<div className="NavBar">
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="#home">Home</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
							<Nav.Link as={Link} to="/items">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/items/keyboards">
								Keyboard
							</Nav.Link>
							<Nav.Link as={Link} to="/items/accessories">
								Accessories
							</Nav.Link>
							<Nav.Link as={Link} to="/cart">
								Cart
							</Nav.Link>
						</Nav>
						<Form inline>
							<FormControl
								onChange={props.changeHandler}
								value={props.searchValue}
								type="text"
								placeholder="Search"
								className="mr-sm-2"
							/>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</ul>
	);
}

export default NavBar;
