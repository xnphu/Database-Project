import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/NavBar';
import GuestInfo from './Containers/GuestInfo';
import HostInfo from './Containers/HostInfo';
import RoomInfo from './Containers/RoomInfo';

import { BrowserRouter, Route } from 'react-router-dom';
import CreateGuest from './Components/CreateGuest';
import EditGuest from './Components/EditGuest';
import CreateHost from './Components/CreateHost';
import EditHost from './Components/EditHost';
import CreateRoom from './Components/CreateRoom';
import EditRoom from './Components/EditRoom';


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
                <div className="d-flex justify-content-center">
                  <h3 className="mt-5">This is HomeScreen</h3>              
                </div>
              );
            }}
          />
          <Route
            path="/guests/info"
            render={props => {
              return <GuestInfo {...props}/>
            }}
          />
          <Route
            path="/guests/createNew"
            render={props => {
              return <CreateGuest {...props} />
            }}
          />
          <Route
            path="/guests/:guestId/edit"
            render={props => {
              return <EditGuest {...props} />
            }}
          />
          <Route
            path="/hosts/info"
            render={props => {
              return <HostInfo {...props}/>
            }}
          />
          <Route
            path="/hosts/createNew"
            render={props => {
              return <CreateHost {...props} />
            }}
          />
          <Route
            path="/hosts/:hostId/edit"
            render={props => {
              return <EditHost {...props} />
            }}
          />
          <Route
            path="/rooms/info"
            render={props => {
              return <RoomInfo {...props}/>
            }}
          />
          <Route
            path="/rooms/createNew"
            render={props => {
              return <CreateRoom {...props} />
            }}
          />
          <Route
            path="/rooms/:roomId/edit"
            render={props => {
              return <EditRoom {...props} />
            }}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
