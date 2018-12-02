import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Table, Button, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

class EditGuest extends Component {
    state = {
        addGuestId: '',
        deleteGuestId: ''
    }

    componentDidMount() {
        axios
            .get(`/api/rooms/${this.props.match.params.roomId}`)
            .then(response => {
                console.log(this.props.match.params.roomId)
                console.log(response.data.roomFound)
                this.setState({
                    hostId: response.data.roomFound.host,
                    guestId: response.data.roomFound.guest,
                    address: response.data.roomFound.address,
                    bookingfee: response.data.roomFound.bookingfee,
                    numberOfGuests: response.data.roomFound.numberOfGuests,
                    bedroom: response.data.roomFound.bedroom,
                    bed: response.data.roomFound.bed,
                    bath: response.data.roomFound.bath
                });
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const roomData = {
            host: this.state.hostId,
            guest: this.state.guestId,
            address: this.state.address,
            bookingfee: this.state.bookingfee,
            numberOfGuests: this.state.numberOfGuests,
            bedroom: this.state.bedroom,
            bed: this.state.bed,
            bath: this.state.bath
        }
        console.log(roomData)
        axios
            .put(`/api/rooms/${this.props.match.params.roomId}`, roomData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    window.location.href = "/rooms/info";
                }
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddEvent = () => {
        console.log(this.state.addGuestId)
        this.state.guestId.push(this.state.addGuestId)
        console.log(this.state.guestId)
    }

    handleDeleteEvent = () => {
        console.log(this.state.deleteGuestId)
        let index = this.state.guestId.indexOf(this.state.deleteGuestId)
        console.log(index)
        if (index > -1) {
            this.state.guestId.splice(index, 1)
        }
        console.log(this.state.guestId)
    }

    render() {
        const allInfo = this.state.guestId
            ? this.state.guestId.map(info => (
                <tr key={info}>
                    <td>{info}</td>
                </tr>
            ))
            : "";
        return (
            <Container>
                <h1 className="text-center mt-5">Edit Room's Information: </h1>
                <Table striped bordered className="mt-3">
                    <thead>
                        <tr>
                            <th>Host's ID</th>
                            <th>Booking Fee ($/night)</th>
                            <th>Guest(s)</th>
                            <th>Bedroom(s)</th>
                            <th>Bed(s)</th>
                            <th>Bath(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.hostId}</td>
                            <td><Input name="bookingfee" defaultValue={this.state.bookingfee} onChange={this.handleInputChange} /></td>
                            <td><Input name="numberOfGuests" defaultValue={this.state.numberOfGuests} onChange={this.handleInputChange} /></td>
                            <td><Input name="bedroom" defaultValue={this.state.bedroom} onChange={this.handleInputChange} /></td>
                            <td><Input name="bed" type="number" defaultValue={this.state.bed} onChange={this.handleInputChange} /></td>
                            <td><Input name="bath" type="number" defaultValue={this.state.bath} onChange={this.handleInputChange} /></td>
                        </tr>
                    </tbody>
                </Table>

                <Label>Address: </Label>
                <Input name="address" defaultValue={this.state.address} onChange={this.handleInputChange} />
                <div>
                    <Table striped bordered className="mt-5">
                        <thead>
                            <tr>
                                <th>Guest's ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allInfo}
                        </tbody>
                    </Table>
                    <Label>Add Guest:</Label>
                    <div className="d-flex">
                        <Input name="addGuestId" onChange={this.handleInputChange} />
                        <Button color="primary ml-2" onClick={this.handleAddEvent}>Add</Button>
                    </div>
                    <Label className="mt-2">Delete Guest:</Label>
                    <div className="d-flex">
                        <Input name="deleteGuestId" onChange={this.handleInputChange} />
                        <Button color="danger ml-2" onClick={this.handleDeleteEvent}>Delete</Button>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <Button color="success" className="mt-3" onClick={this.handleSubmit}>Save Changes</Button>
                    <Link to={"/rooms/info"}>
                        <Button color="primary" className="ml-2 mt-3">Cancel</Button>
                    </Link>
                    <Button
                        color="danger"
                        className="ml-2 mt-3"
                        onClick={this.handleClick = () => {
                            axios
                                .delete(`/api/rooms/${this.props.match.params.roomId}`)
                                .then(response => {
                                    console.log(response.data);
                                    if (response.data.success) {
                                        window.location.href = "/rooms/info";
                                    }
                                })
                                .catch(err => console.log(err));
                        }}>
                        Delete room
                    </Button>
                </div>
            </Container>
        );
    }
}

export default EditGuest;