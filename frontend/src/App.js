import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/NavBar';
import GuestInfo from './Containers/GuestInfo';
import HostInfo from './Containers/HostInfo';
import RoomInfo from './Containers/RoomInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <GuestInfo />
        <HostInfo />
        <RoomInfo />
      </div>
    );
  }
}

export default App;
