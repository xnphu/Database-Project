import React, { Component } from 'react';

import axios from "../Configs/axiosConfig";
import { Container, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class HostInfo extends Component {
    state = {
        hosts: []
    }

    componentDidMount() {
        axios
            .get("/api/hosts")
            .then(response => {
                console.log(response.data.hosts);
                this.setState({
                    hosts: response.data.hosts
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        const allInfo = this.state.hosts
            ? this.state.hosts.map(info => (
                <tr key={info._id}>
                    <td>{info._id}</td>
                    <td>{info.name}</td>
                    <td>{info.email}</td>
                    <td>{info.age}</td>
                    <td>{info.phone}</td>
                    <td>
                        <Link to={`/hosts/${info._id}/edit`}>
                            <Button color="success">Edit</Button>
                        </Link>
                    </td>
                </tr>
            ))
            : "";
        return (
            <Container>
                <h1 className="text-center mt-5">Host's Information</h1>
                <div>
                    <Link to={"/hosts/createNew"}>
                        <Button color="primary" className="mt-3">Add</Button>
                    </Link>                   
                </div>
                <Table striped bordered className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Phone</th>
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

export default HostInfo;