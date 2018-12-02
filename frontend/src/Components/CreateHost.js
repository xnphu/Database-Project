import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateHost extends Component {

    state = {
        name: '',
        email: '',
        age: '',
        phone: ''
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
            .post("api/hosts",  hostData)
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
                <h3 className="mt-5 ml-2">Add Host's Information: </h3>
                <Form className="mt-2" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Name: </Label>
                        <Input name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email: </Label>
                        <Input name="email" placeholder="Enter email" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Age: </Label>
                        <Input name="age" type="number" placeholder="Enter age" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone: </Label>
                        <Input name="phone" type="number" placeholder="Enter phone" onChange={this.handleInputChange} />
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                        <Button color="primary">Submit</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default CreateHost;     