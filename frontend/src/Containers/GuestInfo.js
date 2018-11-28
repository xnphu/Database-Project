import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Table, Button, Input } from 'reactstrap';

class GuestInfo extends Component {
    state = {
        guests: []
    }

    componentDidMount() {
        axios
            .get("/api/guests")
            .then(response => {
                console.log(response.data.guests);
                this.setState({
                    guests: response.data.guests
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        const allInfo = this.state.guests
        ? this.state.guests.map(info => (
            <tr key={info._id}>
                <td>{info._id}</td>
                <td>{info.name}</td>
                <td>{info.email}</td>
                <td>{info.age}</td>
                <td>{info.phone}</td>
            </tr>
        ))
        : "";
        return (
            <Container>
                <h1 className="text-center">Guest's Information</h1>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Phone</th>
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

export default GuestInfo;