import React, { Component } from 'react';
import ActivityService from '../../services/activity-service'

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
            return("Ok")
        } else {
            return(
                <div>
                    <div>
                        {this.state.questions.map((item, index) => {
                            return(
                                <input value={item} onChange={(e) => {this.onTextChange(e.target.value, index)}}/>
                            )
                        })}
                        <button onClick={()=>{this.addNewQuestion(this)}}>Add new question</button>
                    </div>
                    <button onClick={() => {this.sendQuestions(this)}}>Send</button>
                </div>
            )
        }
    }
}

export default CreateActivityModal;