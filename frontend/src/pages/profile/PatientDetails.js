import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth.context';
import PatientService from '../../services/patient-service';
import ActivityService from '../../services/activity-service';
import SessionService from '../../services/session-service';
import BaseModal from '../../components/modals/BaseModal';
import SeeActivityModal from '../../components/modals/SeeActivityModal';
import CreateActivityModal from '../../components/modals/CreateActivityModal';
import SessionModal from '../../components/modals/SessionModal';
import { getDateFormat } from '../../helpers/helpers';

class PatientDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            patient: {
                activities: [],
                sessions: []
            },
            isSeeActivityModalVisible: false,
            currentActivity: {},
            isCreateActivityModalVisible: false,
            isSessionModalVisible: false,
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

    onModalClose(){
        this.getPatientData();
        this.setState({
            isCreateActivityModalVisible: false,
            isSessionModalVisible: false,
        });
    }

    componentDidMount(){
        this.getPatientData();
    }

    seeSessionModal(session){
        this.setState({
            isSessionModalVisible: true,
            currentSession: session
        })
    }

    deleteActivity(activity){
        const id = activity._id;
        const activityService = new ActivityService();
        activityService.deleteActivity(id)
        .then(() => {
            this.getPatientData();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteSession(session){
        const id = session._id;
        const sessionService = new SessionService();
        sessionService.deleteSession(id)
        .then(() => {
            this.getPatientData();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deletePatient(){
        const id = this.state.patient._id;
        const patientService = new PatientService();
        patientService.deletePatient(id)
        .then(() => {
            window.location.href = '/user-selector';
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                <div>
                    <h1>{this.state.patient.name}</h1>
                    <p>{this.state.patient.email}</p>
                    <button onClick={() => {this.deletePatient(this)}}>Delete patient</button>
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
                                    <h2>{getDateFormat(item.date)}</h2>
                                    <button onClick={() => {this.seeActivityModal(item)}}>See activity</button>
                                    <button onClick={() => {this.deleteActivity(item)}}>Delete activity</button>
                                </div>
                            )
                        })}
                    </div>
                <div>
                    <div>
                        <h2>Sessions</h2>
                        <button onClick={() => {this.setState({isSessionModalVisible: true})}}>+</button>
                    </div>
                    <div>
                        {this.state.patient.sessions.map((item) => {
                            return(
                                <div>
                                    <h2>{getDateFormat(item.date)}</h2>
                                    <button onClick={() => {this.seeSessionModal(item)}}>See session</button>
                                    <button onClick={() => {this.deleteSession(item)}}>Delete session</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                </div>
                <BaseModal visible={this.state.isSeeActivityModalVisible} onModalClose={() => {this.setState({isSeeActivityModalVisible:false})}}>
                    <SeeActivityModal content={this.state.currentActivity} />
                </BaseModal>
                <BaseModal visible={this.state.isCreateActivityModalVisible} onModalClose={() => {this.onModalClose(this)}}>
                    <CreateActivityModal patientId={this.state.patient._id} />
                </BaseModal>
                <BaseModal visible={this.state.isSessionModalVisible} onModalClose={() => {this.onModalClose(this)}}>
                    <SessionModal 
                        content={this.state.currentSession}
                        isNew={!this.state.currentSession || !this.state.currentSession.comment}
                        patientId={this.state.patient._id}
                    />
                </BaseModal>
            </div>
        )
    }
}

export default withRouter(withAuth(PatientDetails));