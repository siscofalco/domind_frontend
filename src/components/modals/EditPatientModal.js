import React, { Component } from 'react';
import PatientService from '../../services/patient-service';
import { getInputDateFormat } from '../../helpers/helpers';

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
            return 'ok';
        } else {
            return(
                <div>
                    <div>
                        <label>Username:</label><input value={this.state.username} onChange={(e) => {this.onUsernameChange(e.target.value)}} />
                    </div>
                    <div>
                        <label>Name:</label><input value={this.state.name} onChange={(e) => {this.onNameChange(e.target.value)}} />
                    </div>
                    <div>
                        <label>Email:</label><input value={this.state.email} onChange={(e) => {this.onEmailChange(e.target.value)}} />
                    </div>
                    <div>
                        <label>Birthdate:</label><input value={this.state.birthdate} type="date" onChange={(e) => {this.onBirthdateChange(e.target.value)}} />
                    </div>
                    <button onClick={() => {this.editPatient(this)}}>Send</button>
                </div>
            )
        }
    }
}

export default EditPatientModal;