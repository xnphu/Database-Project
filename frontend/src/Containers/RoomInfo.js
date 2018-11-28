import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Table, Button, Input } from 'reactstrap';

class RoomInfo extends Component {
    state = {
        rooms: []
    }

    componentDidMount() {
        axios
            .get("/api/rooms")
            .then(response => {
                console.log(response.data.rooms);
                this.setState({
                    rooms: response.data.rooms
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        const allInfo = this.state.rooms
            ? this.state.rooms.map(info => (
                <tr key={info._id}>
                    <td>{info.host.name}</td>
                    <td>{info.guest.name}</td>
                    <td>{info.address}</td>
                    <td>{info.bookingfee}</td>
                    <td>{info.numberOfGuests}</td>
                    <td>{info.bedroom}</td>
                    <td>{info.bed}</td>
                    <td>{info.bath}</td>
                </tr>
            ))
            : "";
        return (
            <Container>
                <h1 className="text-center">Room's Information</h1>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Host's name</th>
                            <th>Guest's name</th>
                            <th>Address</th>
                            <th>Booking Fee  ( $/night)</th>
                            <th>Number of Guests</th>
                            <th>Bedroom</th>
                            <th>Bed</th>
                            <th>Bath</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allInfo}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    <div>
                        <Button color="primary" className="mr-3">Add</Button>
                    </div>
                    <div>
                        <Button color="success">Edit</Button>
                    </div>
                    <div>
                        <Button color="danger" className="ml-3">Delete</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default RoomInfo;