import React from "react";
import { Link } from "react-router-dom"

const NavbarTitle = props => <Link class="navbar-brand" to={props.link}>{props.title}</Link>

const NavbarItem = props => (
    <li class="nav-item">
        <Link class="nav-link" to={props.link}>{props.text}</Link>
    </li>
);

const NavbarList = props => {
    const listItems = props.items.map(item => <NavbarItem text={item.text} link={item.link} />);
    return (
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                {listItems}
            </ul>
        </div>
    );
}

const Navbar = props => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <NavbarTitle
                title={props.title}
                link={props.homeLink}
            />
            <NavbarList items={props.items} />
        </nav>
    );
}

export default Navbar;
