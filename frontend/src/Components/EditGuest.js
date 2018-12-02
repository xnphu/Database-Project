import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Table, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class EditGuest extends Component {
    state = {
    }

    componentDidMount() {
        axios
            .get(`/api/guests/${this.props.match.params.guestId}`)
            .then(response => {
                console.log(this.props.match.params.guestId)
                console.log(response.data.guestFound)
                this.setState({
                    _id: response.data.guestFound._id,
                    name: response.data.guestFound.name,
                    email: response.data.guestFound.email,
                    age: response.data.guestFound.age,
                    phone: response.data.guestFound.phone,
                });
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const guestData = {
            name: this.state.name,
            email: this.state.email,
            age: this.state.age,
            phone: this.state.phone
        }
        axios
            .put(`/api/guests/${this.props.match.params.guestId}`, guestData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    window.location.href = "/guests/info";
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
                <h1 className="text-center mt-5">Edit Guest's Information: </h1>
                <Table striped bordered className="mt-3">
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
                        <tr>
                            <td>{this.state._id}</td>
                            <td><Input name="name" defaultValue={this.state.name} onChange={this.handleInputChange} /></td>
                            <td><Input name="email" defaultValue={this.state.email} onChange={this.handleInputChange} /></td>
                            <td><Input name="age" type="number" defaultValue={this.state.age} onChange={this.handleInputChange} /></td>
                            <td><Input name="phone" type="number" defaultValue={this.state.phone} onChange={this.handleInputChange} /></td>
                        </tr>
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    <Button color="success" className="mt-3" onClick={this.handleSubmit}>Save Changes</Button>
                    <Link to={"/guests/info"}>
                        <Button color="primary" className="ml-2 mt-3">Cancel</Button>
                    </Link>
                    <Button
                        color="danger"
                        className="ml-2 mt-3"
                        onClick={this.handleClick = () => {
                            axios
                                .delete(`/api/guests/${this.props.match.params.guestId}`)
                                .then(response => {
                                    console.log(response.data);
                                    if (response.data.success) {
                                        window.location.href = "/guests/info";
                                    }
                                })
                                .catch(err => console.log(err));
                        }}>
                        Delete
                    </Button>
                </div>
            </Container>
        );
    }
}

export default EditGuest;