import React, { Component } from 'react';
import ActivityService from '../../services/activity-service';
import { Button } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './BaseModal.css';

class ActivityModal extends Component {
    constructor(props){
        super(props)

        this.state = {
            answers: [],
            isSuccess: false,
        }
    }

    componentDidMount(){
        console.log(this.props.content)
        const answers = this.props.content.questions.map(() => {
            return "";
        })
        this.setState({
            answers: answers,
        })
    }

    onAnswerChange(value, index){
        const answers = this.state.answers;
        answers[index] = value;
        this.setState({
            answers: answers,
        })
    }

    sendAnswers(){
        const activityService = new ActivityService();
        activityService.editActivity(this.props.content._id, { answers: this.state.answers })
        .then(() => {
            this.setState({
                isSuccess: true,
            })
        })
    
    }

    render(){
        if (this.state.isSuccess) {
            return (<CheckCircleIcon />);
        } else {
            return(
                <div className="activityModal">
                    <div>
                        {this.props.content.questions.map((item, index) => {
                            return(
                                <div>
                                    <h3>{item}</h3>
                                    <input type="text" onChange={(e) => {this.onAnswerChange(e.target.value, index)}}/>
                                </div>
                            )
                        })}
                    </div>
                    <Button variant="outlined" color="primary" onClick={() => { this.sendAnswers(this); }}>Send</Button>
                </div>
            )
        }
    }
}

export default ActivityModal;
