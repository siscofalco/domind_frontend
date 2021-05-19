import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth.context';
import DoctorService from '../../services/doctor-service';
import BaseModal from '../../components/modals/BaseModal';
import EditDoctorModal from '../../components/modals/EditDoctorModal';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';

import './Profile.css';

class DoctorProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            doctor: {
                patients: [],
            },
            isEditDoctorModalVisible: false,
        };
    }

    getDoctorData() {
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

    componentDidMount(){
        this.getDoctorData();
    }

    onModalClose(){
        this.getDoctorData();
        this.setState({
            isEditDoctorModalVisible: false,
        });
    }

    render() {
        return(
            <div>
                <div className="userDetails">
                    <h1>{this.state.doctor.name}</h1>
                    <div className="userDetailsRow">
                        <span>{this.state.doctor.email}</span>
                        <span>{this.state.doctor.mobilephone}</span>
                        <div onClick={() => {this.setState({ isEditDoctorModalVisible : true })}}><EditIcon /></div>
                    </div>
                </div>
                <div>
                    <div className="sectionTitleContainer">
                        <h2 className="sectionTitle">Patients</h2>
                    </div>
                    <div className="list">
                        {this.state.doctor.patients.map((item) => {
                            return(
                                <div className="listRow">
                                    <span className="listRowTitle">{item.name}</span>
                                    <a href={`/patient-details/${item._id}`}><ArrowForwardIcon /></a>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <BaseModal visible={this.state.isEditDoctorModalVisible} onModalClose={() => {this.onModalClose(this)}}>
                    <EditDoctorModal content={this.state.doctor} />
                </BaseModal>
            </div>
        )
    }
}

export default withRouter(withAuth(DoctorProfile));
