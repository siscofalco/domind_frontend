import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth.context';
import DoctorService from '../../services/doctor-service';

class DoctorProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            doctor: {
                patients: [],
            },
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const doctorService = new DoctorService();
        doctorService.getDoctor(id)
        .then((response) => {
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
                <p>{this.state.doctor.email}</p>
                <p>{this.state.doctor.mobilephone}</p>
                <div>
                    {this.state.doctor.patients.map((item) => {
                        return(
                            <div>
                                <h2>{item.name}</h2>
                                <a href={`/patient-profile/${item._id}`}>Show profile</a>
                            </div>
                        );
                    })}
                </div>
                <button onClick={this.props.logout}>Log out</button>
            </div>
        )
    }
}

export default withRouter(withAuth(DoctorProfile));
