import React, { Component } from 'react';
import { withAuth } from '../../context/auth.context';
import PatientService from '../../services/patient-service';

class PatientProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            patient: {},
        };
    }

    componentDidMount(){
        console.log(this.props);
        const id = this.props.location.search.split('?id=')[1];

        const patientService = new PatientService();
        patientService.getPatient(id)
        .then((response) => {
            this.setState({
                patient: response.data,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                <h1>{this.state.patient.name}</h1>
                <button onClick={this.props.logout}>Log out</button>
            </div>
        )
    }
}

export default withAuth(PatientProfile);