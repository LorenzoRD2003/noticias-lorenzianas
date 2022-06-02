import React from "react";
import { Link } from "react-router-dom"
import { loggedOutItems, loggedInItems } from "./NavbarItems";

// Navbar Title
const NavbarTitle = props => <Link className="navbar-brand" to={props.link}>{props.title}</Link>

// Navbar Item
const NavbarItem = props => (
    <li className="nav-item">
        <Link className="nav-link" to={props.link}>{props.text}</Link>
    </li>
);

// Navbar List
const NavbarList = props => {
    const listItems = props.items.map((item, index) => <NavbarItem key={index} text={item.text} link={item.link} />);
    return (
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                {listItems}
            </ul>
        </div>
    );
}

// Main Component
const Navbar = props => {
    const items = props.loggedIn ? loggedInItems : loggedOutItems;
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavbarTitle
                title={props.title}
                link={props.homeLink}
            />
            <NavbarList items={items}/>
        </nav>
    );
}

export default Navbar;
