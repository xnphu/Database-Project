import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/NavBar';
import GuestInfo from './Containers/GuestInfo';
import HostInfo from './Containers/HostInfo';
import RoomInfo from './Containers/RoomInfo';

import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import CreateGuest from './Components/CreateGuest';
import EditGuest from './Components/EditGuest';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route
            exact
            path="/"
            render={props => {
              return (
                <div>
                  <GuestInfo {...props}/>
                  <HostInfo />
                  <RoomInfo />
                </div>
              );
            }}
          />
          <Route
            path="/guests/createNew"
            render={props => {
              return <CreateGuest {...props} />
            }}
          />
          <Route
            path="/guests/:guestId"
            render={props => {
              return <EditGuest {...props} />
            }}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
