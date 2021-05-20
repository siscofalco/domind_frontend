import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth.context';
import PatientService from '../../services/patient-service';
import DiaryService from '../../services/diary-service';
import BaseModal from '../../components/modals/BaseModal';
import ActivityModal from '../../components/modals/ActivityModal';
import DiaryModal from '../../components/modals/DiaryModal';
import { getDateFormat } from '../../helpers/helpers';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import './Profile.css';

class PatientProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            patient: {
                activities: [],
                diary: [],
            },
            isActivityModalVisible: false,
            currentActivity: {},
            isDiaryModalVisible: false,
            currentDiary: {},
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

    componentDidMount(){
        this.getPatientData();
    }

    openActivityModal(activity){
        this.setState({
            isActivityModalVisible: true,
            currentActivity: activity,
        });
    }

    openDiaryModal(diary){
        this.setState({
            isDiaryModalVisible: true,
            currentDiary: diary,
        });
    }

    newDiary(){
        this.setState({
            isDiaryModalVisible: true,
            currentDiary: {},
        })
    }

    onCloseModal(){
        this.getPatientData();
        this.setState({
            isActivityModalVisible: false,
            isDiaryModalVisible: false,
        })
    }

    deleteDiary(diary){
        const id = diary._id;
        const diaryService = new DiaryService();
        diaryService.deleteDiary(id)
        .then(() => {
            this.getPatientData();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                <div className="userDetails">
                    <h1 className="name">{this.state.patient.name}</h1>
                    <div className="userDetailsRow">
                        <span>{this.state.patient.email}</span>
                    </div>
                </div>
                <div>
                    <div className="sectionTitleContainer">
                        <h2 className="sectionTitle">Activities</h2>
                    </div>                    <div className="list">
                        {this.state.patient.activities.length ? this.state.patient.activities.map((item) => {
                            return(
                                <div className="listRow">
                                    <span className="listRowTitle">{getDateFormat(item.date)}</span>
                                    {(!item.answers || !item.answers.length) ?
                                        (<div onClick={() => {this.openActivityModal(item)}}><AnnouncementIcon /></div>) : <CheckBoxIcon />}
                                </div>
                            )
                        }) : 'You have no activities'}
                    </div>
                </div>
                <div>
                    <div className="sectionTitleContainer">
                        <h2 className="sectionTitle">Diaries</h2>
                        <div onClick={() => {this.newDiary()}}><AddCircleIcon /></div>
                    </div>
                    <div className="list">
                        {this.state.patient.diary.length ? this.state.patient.diary.map((item) => {
                            return(
                                <div className="listRow">
                                    <div className="listPack">
                                        <span className="listRowTitle">{getDateFormat(item.date)}</span>
                                        <div onClick={() => {this.openDiaryModal(item)}}><VisibilityIcon /></div>
                                    </div>
                                    <div onClick={() => {this.deleteDiary(item)}}><DeleteIcon /></div>
                                </div>
                            )
                        }) : 'You have no diaries'}
                    </div>
                </div>
                <BaseModal visible={this.state.isActivityModalVisible} onModalClose={() => {this.onCloseModal(this)}}>
                    <ActivityModal content={this.state.currentActivity} />
                </BaseModal>
                <BaseModal visible={this.state.isDiaryModalVisible} onModalClose={() => {this.onCloseModal(this)}}>
                    <DiaryModal
                        content={this.state.currentDiary}
                        isNew={!this.state.currentDiary || !this.state.currentDiary.comment}
                        patientId={this.state.patient._id}
                        />
                </BaseModal>
            </div>
        )
    }
}

export default withRouter(withAuth(PatientProfile));