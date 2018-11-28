import React, { Component } from 'react';
import { Navbar, NavbarBrand, Container } from 'reactstrap';

import { Link } from 'react-router-dom';

import logo from '../img/airbnb_logo.png';
import SearchField from "./SearchField";
import ProfilePanel from "./ProfilePanel";

class NavBar extends Component {
    render() {
        return (
            <Navbar color="" className="navbar">
                <Container>
                    <div className="col-3 text-center">
                        <NavbarBrand>
                            {/* <Link to="/"> */}
                            <img src={logo} alt="Airbnb Logo" />
                            {/* </Link> */}
                        </NavbarBrand>
                    </div>
                    <SearchField onSearchChanged={this.props.onSearchChanged} />
                    <ProfilePanel
                        username={this.props.username}
                        onLogin={this.props.onLogin}
                    />
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;