import React, { Component } from 'react';
import { withAuth } from '../../context/auth.context';
import DoctorService from '../../services/doctor-service';

class DoctorProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            doctor: {},
        };
    }

    componentDidMount(){
        console.log(this.props);
        const id = this.props.location.search.split('?id=')[1];

        const doctorService = new DoctorService();
        doctorService.getDoctor(id)
        .then((response) => {
            console.log(response)
            this.setState({
                doctor: response.data,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                <h1>{this.state.doctor.name}</h1>
                <button onClick={this.props.logout}>Log out</button>
            </div>
        )
    }
}

export default withAuth(DoctorProfile);