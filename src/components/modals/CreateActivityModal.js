import React, { Component } from 'react';
import ActivityService from '../../services/activity-service'
import { TextField, Button } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class CreateActivityModal extends Component {
    constructor(props){
        super(props)

        this.state = {
            questions: [""],
            isSuccess: false,
        }
    }

    onTextChange(value, index){
        const questionsAux = [...this.state.questions];
        questionsAux[index] = value;
        this.setState({
            questions: questionsAux,
        })
    }

    addNewQuestion(){
        const questionsAux = [...this.state.questions];
        questionsAux.push("")
        this.setState({
            questions: questionsAux,
        })
    }

    sendQuestions(){
        const questionsAux = [...this.state.questions];
        const filteredQuestions = questionsAux.filter((item) => {
            if(item.length > 0){
                return true;
            } else {
                return false;
            }
        })

        if(filteredQuestions.length > 0){
            const activityService = new ActivityService();
            activityService.createActivity({
                questions: filteredQuestions,
                patient: this.props.patientId
            })
            .then(() => {
                this.setState({
                    isSuccess: true,
                })
            })
        }
    }

    render(){
        if(this.state.isSuccess){
            return(<CheckCircleIcon />)
        } else {
            return(
                <div className="createActivityModal">
                    <div className="createActivityModalList">
                        {this.state.questions.map((item, index) => {
                            return(
                                <div className="modalRow">
                                    <TextField placeholder="Question..." value={item} onChange={(e) => {this.onTextChange(e.target.value, index)}}/>
                                    {index === this.state.questions.length - 1 ? (<div onClick={()=>{this.addNewQuestion(this)}}><AddCircleOutlineIcon /></div>) : null}
                                </div>
                            )
                        })}
                        
                    </div>
                    <Button variant="outlined" color="primary" onClick={() => {this.sendQuestions(this)}}>Send</Button>
                </div>
            )
        }
    }
}

export default CreateActivityModal;