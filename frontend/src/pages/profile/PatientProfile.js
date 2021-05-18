import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth.context';
import PatientService from '../../services/patient-service';
import BaseModal from '../../components/modals/BaseModal';
import ActivityModal from '../../components/modals/ActivityModal';
class PatientProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            patient: {
                activities: [],
            },
            isModalVisible: false,
            currentActivity: {},
        };
    }

    componentDidMount(){
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

    openActivityModal(activity){
        this.setState({
            isModalVisible: true,
            currentActivity: activity,
        });
    }

    render() {
        return(
            <div>
                <h1>{this.state.patient.name}</h1>
                <h1>{this.state.patient.email}</h1>
                <div>{this.state.patient.activities.map((item) => {
                    return(
                        <div>
                            <h2>{item.date}</h2>
                            {(!item.answers || !item.answers.length) ?
                                (<button onClick={() => {this.openActivityModal(item)}}>Do activity</button>) : null}
                        </div>
                    )
                })}</div>
                <button onClick={this.props.logout}>Log out</button>
                <BaseModal visible={this.state.isModalVisible} onModalClose={() => {this.setState({isModalVisible:false})}}>
                    <ActivityModal content={this.state.currentActivity} />
                </BaseModal>
            </div>
        )
    }
}

export default withRouter(withAuth(PatientProfile));