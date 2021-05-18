import React, { Component } from 'react';
import ActivityService from '../../services/activity-service'

class CreateActivityModal extends Component {
    constructor(){
        super()

        this.state = {
            questions: [""],
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

    render(){
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

export default CreateActivityModal;