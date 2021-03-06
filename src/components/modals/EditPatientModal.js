import React, { Component } from 'react';
import PatientService from '../../services/patient-service';
import { getInputDateFormat } from '../../helpers/helpers';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { TextField, Button } from '@material-ui/core';

class EditPatientModal extends Component {
    constructor(props){
        super(props);

        const { name, username, email, birthdate } = props.content;
        console.log(getInputDateFormat(birthdate))
        this.state = {
            name,
            username,
            email,
            birthdate: getInputDateFormat(birthdate),
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

    onBirthdateChange(value) {
        this.setState({ birthdate: value });
    }

    editPatient() {
        const patientService = new PatientService();
        patientService.editPatient(this.props.content._id, {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            birthdate: new Date(this.state.birthdate),
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
                        <label>Birthdate:</label><TextField value={this.state.birthdate} type="date" onChange={(e) => {this.onBirthdateChange(e.target.value)}} />
                    </div>
                    <Button variant="outlined" color="primary" onClick={() => {this.editPatient(this)}}>Send</Button>
                </div>
            )
        }
    }
}

export default EditPatientModal;