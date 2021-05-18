import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth.context';
import PatientService from '../../services/patient-service';
import BaseModal from '../../components/modals/BaseModal';
import ActivityModal from '../../components/modals/ActivityModal';
import DiaryModal from '../../components/modals/DiaryModal';
import { getDateFormat } from '../../helpers/helpers';
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

    render() {
        return(
            <div>
                <div>
                    <h1>{this.state.patient.name}</h1>
                    <h1>{this.state.patient.email}</h1>
                </div>
                <div>
                    <h2>Activities</h2>
                    <div>
                        {this.state.patient.activities.map((item) => {
                            return(
                                <div>
                                    <h2>{getDateFormat(item.date)}</h2>
                                    {(!item.answers || !item.answers.length) ?
                                        (<button onClick={() => {this.openActivityModal(item)}}>Do activity</button>) : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2>Diaries</h2>
                    <button onClick={() => {this.newDiary()}}>+</button>
                    <div>
                        {this.state.patient.diary.map((item) => {
                            return(
                                <div>
                                    <h2>{getDateFormat(item.date)}</h2>
                                    <button onClick={() => {this.openDiaryModal(item)}}>See diary</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button onClick={this.props.logout}>Log out</button>
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