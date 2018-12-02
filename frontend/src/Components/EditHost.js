import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Table, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class EditHost extends Component {
    state = {
    }

    componentDidMount() {
        axios
            .get(`/api/hosts/${this.props.match.params.hostId}`)
            .then(response => {
                console.log(this.props.match.params.hostId)
                console.log(response.data.hostFound)
                this.setState({
                    _id: response.data.hostFound._id,
                    name: response.data.hostFound.name,
                    email: response.data.hostFound.email,
                    age: response.data.hostFound.age,
                    phone: response.data.hostFound.phone,
                });
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const hostData = {
            name: this.state.name,
            email: this.state.email,
            age: this.state.age,
            phone: this.state.phone
        }
        axios
            .put(`/api/hosts/${this.props.match.params.hostId}`, hostData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    window.location.href = "/hosts/info";
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
                <h1 className="text-center mt-5">Edit Host's Information: </h1>
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
                    <Link to={"/hosts/info"}>
                        <Button color="primary" className="ml-2 mt-3">Cancel</Button>
                    </Link>
                    <Button
                        color="danger"
                        className="ml-2 mt-3"
                        onClick={this.handleClick = () => {
                            axios
                                .delete(`/api/hosts/${this.props.match.params.hostId}`)
                                .then(response => {
                                    console.log(response.data);
                                    if (response.data.success) {
                                        window.location.href = "/hosts/info";
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

export default EditHost;