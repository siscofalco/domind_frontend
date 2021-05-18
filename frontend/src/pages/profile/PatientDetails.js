import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth.context';
import PatientService from '../../services/patient-service';
import BaseModal from '../../components/modals/BaseModal';
import SeeActivityModal from '../../components/modals/SeeActivityModal';
import CreateActivityModal from '../../components/modals/CreateActivityModal';

class PatientDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            patient: {
                activities: [],
            },
            isSeeActivityModalVisible: false,
            currentActivity: {},
            isCreateActivityModalVisible: false,  
        };
    }

    getPatientData(){
        const id = this.props.match.params.id;
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

    seeActivityModal(activity){
        this.setState({
            isSeeActivityModalVisible: true,
            currentActivity: activity
        })
    }

    componentDidMount(){
        this.getPatientData();
    }

    render() {
        return(
            <div>
                <div>
                    <h1>{this.state.patient.name}</h1>
                    <p>{this.state.patient.email}</p>
                </div>
                <div>
                    <div>
                        <h2>Activities</h2>
                        <button onClick={()=>{this.setState({isCreateActivityModalVisible: true})}}>+</button>
                    </div>
                    <div>
                        {this.state.patient.activities.map((item) => {
                            return(
                                <div>
                                    <h2>{item.date}</h2>
                                    <button onClick={() => {this.seeActivityModal(item)}}>See Activity</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <BaseModal visible={this.state.isSeeActivityModalVisible} onModalClose={() => {this.setState({isSeeActivityModalVisible:false})}}>
                    <SeeActivityModal content={this.state.currentActivity} />
                </BaseModal>
                <BaseModal visible={this.state.isCreateActivityModalVisible} onModalClose={() => {this.setState({isCreateActivityModalVisible:false})}}>
                    <CreateActivityModal />
                </BaseModal>
            </div>
        )
    }
}

export default withRouter(withAuth(PatientDetails));