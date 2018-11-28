import React, { Component } from 'react';

class ProfilePanel extends Component {
    render() {
        return (
            <div className="col-3 profile_panel text-right">
                <button
                    className="col-6 btn btn-primary btn-sm"
                    onClick={this.props.onLogin}
                >
                    Login
                </button>
                <button
                    className="col-6 btn btn-danger btn-sm"
                    onClick={this.props.onLogin}
                >
                    Signup
                </button>
            </div>
        );
    }
}

export default ProfilePanel;