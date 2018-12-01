import React, { Component } from 'react';
import { NavbarBrand } from 'reactstrap';

import { Link } from 'react-router-dom';

import logo from '../img/airbnb_logo.png';
// import SearchField from "./SearchField";

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavbarBrand>
                    <Link to="/">
                        <img src={logo} alt="Airbnb Logo" />
                    </Link>
                </NavbarBrand>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">                   
                            <Link to={"/"} className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/guests/info"} className="nav-link">Guest</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/hosts/info"} className="nav-link">Host</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/rooms/info"} className="nav-link">Room</Link>
                        </li>
                    </ul>
                </div>
                {/* <SearchField onSearchChanged={this.props.onSearchChanged} /> */}
            </nav>
        );
    }
}

export default NavBar;