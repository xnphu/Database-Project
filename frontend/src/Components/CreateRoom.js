import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateRoom extends Component {

    state = {
        hostId: '',
        guestId: '',
        address: '',
        bookingfee: '',
        numberOfGuests: '',
        bedroom: '',
        bed: '',
        bath: '',
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
            bath: this.state.bath,
        }
        axios
            .post("api/rooms", roomData)
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

    render() {
        return (
            <Container>
                <h3 className="mt-5 ml-2">Add Room's Information: </h3>
                <Form className="mt-2" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Host's ID: </Label>
                        <Input name="hostId" placeholder="Enter Host's ID" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Address: </Label>
                        <Input name="address" placeholder="Enter address" onChange={this.handleInputChange} />
                    </FormGroup>                    
                    <div className="form-row">
                    <FormGroup className="col-md-3">
                        <Label>Booking fee($/night): </Label>
                        <Input name="bookingfee" type="number" placeholder="Enter booking fee" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                        <Label>Bedroom(s): </Label>
                        <Input name="bedroom" type="number" placeholder="Enter number of Bedroom" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                        <Label>Bed(s): </Label>
                        <Input name="bed" type="number" placeholder="Enter number of Bed" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                        <Label>Bath(s): </Label>
                        <Input name="bath" type="number" placeholder="Enter number of Bath" onChange={this.handleInputChange} />
                    </FormGroup>
                    </div>
                    <FormGroup>
                        <Label>Number of Guests: </Label>
                        <Input name="numberOfGuests" type="number" placeholder="Enter number of Guests" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Guest's ID: </Label>
                        <Input name="guestId" placeholder="Enter Guest's ID" onChange={this.handleInputChange} />
                    </FormGroup>
                    <div className="d-flex justify-content-center mt-3">
                        <Button color="primary">Submit</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default CreateRoom;     