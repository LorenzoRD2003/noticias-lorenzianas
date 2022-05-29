import React from "react";

const NavbarTitle = props => <a class="navbar-brand" href={props.link}>{props.title}</a>

const NavbarItem = props => (
    <li class="nav-item">
        <a class="nav-link" href={props.link}>{props.text}</a>
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
