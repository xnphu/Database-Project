import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                    {/* <td>{info.guest.name}</td> */}
                    <td>
                        {info.guest
                            ? info.guest.map(guest => (guest.name) + ", ")
                            :""
                        }
                    </td>
                    <td>{info.address}</td>
                    <td>{info.bookingfee}</td>
                    <td>{info.numberOfGuests}</td>
                    <td>{info.bedroom}</td>
                    <td>{info.bed}</td>
                    <td>{info.bath}</td>
                    <td>
                        <Link to={`/rooms/${info._id}/edit`}>
                            <Button color="success">Edit</Button>
                        </Link>
                    </td>
                </tr>
            ))
            : "";
        return (
            <Container>
                <h1 className="text-center mt-5">Room's Information</h1>
                <div>
                    <Link to={"/rooms/createNew"}>
                        <Button color="primary" className="my-2">Add</Button>
                    </Link>
                </div>
                <Table striped bordered className="mt-3">
                    <thead>
                        <tr>
                            <th>Host's name</th>
                            <th>Guest's name</th>
                            <th>Address</th>
                            <th>Booking Fee ($/night)</th>
                            <th>Guest(s)</th>
                            <th>Bedroom(s)</th>
                            <th>Bed(s)</th>
                            <th>Bath(s)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allInfo}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default RoomInfo;