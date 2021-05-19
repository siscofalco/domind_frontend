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
import EditPatientModal from '../../components/modals/EditPatientModal';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import './Profile.css';

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
            isEditPatientModalVisible: false,
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
            isEditPatientModalVisible: false,
            currentSession: {},
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
                <div className="userDetails">
                    <h1>{this.state.patient.name}</h1>
                    <div className="userDetailsRow">
                        <div className="listPack">
                            <span>{this.state.patient.email}</span>
                            <div onClick={() => {this.setState({ isEditPatientModalVisible: true })}}><EditIcon /></div>
                        </div>
                        <div onClick={() => {this.deletePatient(this)}}><DeleteIcon /></div>
                    </div>
                </div>
                <div>
                    <div className="sectionTitleContainer">
                        <h2 className="sectionTitle">Activities</h2>
                        <div onClick={()=>{this.setState({isCreateActivityModalVisible: true})}}><AddCircleIcon /></div>
                    </div>
                    <div className="list">
                        {this.state.patient.activities.map((item) => {
                            return(
                                <div className="listRow">
                                    <div className="listPack">
                                        <span className="listRowTitle">{getDateFormat(item.date)}</span>
                                        <div onClick={() => {this.seeActivityModal(item)}}><VisibilityIcon /></div>
                                    </div>
                                    <div onClick={() => {this.deleteActivity(item)}}><DeleteIcon /></div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <div className="sectionTitleContainer">
                            <h2 className="sectionTitle">Sessions</h2>
                            <div onClick={() => {this.setState({isSessionModalVisible: true})}}><AddCircleIcon /></div>
                        </div>
                        <div className="list">
                            {this.state.patient.sessions.map((item) => {
                                return(
                                    <div className="listRow">
                                        <div className="listPack">
                                            <span className="listRowTitle">{getDateFormat(item.date)}</span>
                                            <div onClick={() => {this.seeSessionModal(item)}}><VisibilityIcon /></div>
                                        </div>
                                        <div onClick={() => {this.deleteSession(item)}}><DeleteIcon /></div>
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
                <BaseModal visible={this.state.isEditPatientModalVisible} onModalClose={() => {this.onModalClose(this)}}>
                    <EditPatientModal content={this.state.patient} />
                </BaseModal>
            </div>
        )
    }
}

export default withRouter(withAuth(PatientDetails));