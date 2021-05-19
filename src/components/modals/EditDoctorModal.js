import React, { Component } from 'react';
import DoctorService from '../../services/doctor-service';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { TextField, Button } from '@material-ui/core';

class EditDoctorModal extends Component {
    constructor(props){
        super(props);

        const { name, username, email, mobilephone } = props.content;

        this.state = {
            name,
            username,
            email,
            mobilephone,
            isSuccess: false,
        };
    }

    onUsernameChange(value) {
        this.setState({ username: value });
    }

    onNameChange(value) {
        this.setState({ name: value });
    }

    onEmailChange(value) {
        this.setState({ email: value });
    }

    onMobilephoneChange(value) {
        this.setState({ mobilephone: value });
    }

    editDoctor() {
        const doctorService = new DoctorService();
        doctorService.editDoctor({
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            mobilephone:this.state.mobilephone,
        }).then(() => {
            this.setState({isSuccess: true});
        })
    }

    render(){
        if (this.state.isSuccess) {
            return (<CheckCircleIcon />);
        } else {
            return(
                <div className="modalBody">
                    <div className="modalRow">
                        <label>Username:</label><TextField value={this.state.username} onChange={(e) => {this.onUsernameChange(e.target.value)}} />
                    </div>
                    <div className="modalRow">
                        <label>Name:</label><TextField value={this.state.name} onChange={(e) => {this.onNameChange(e.target.value)}} />
                    </div>
                    <div className="modalRow">
                        <label>Email:</label><TextField value={this.state.email} onChange={(e) => {this.onEmailChange(e.target.value)}} />
                    </div>
                    <div className="modalRow">
                        <label>Mobilephone:</label><TextField value={this.state.mobilephone} type="tel" onChange={(e) => {this.onMobilephoneChange(e.target.value)}} />
                    </div>
                    <Button variant="outlined" color="primary" onClick={() => {this.editDoctor(this)}}>Send</Button>
                </div>
            )
        }
    }
}

export default EditDoctorModal;