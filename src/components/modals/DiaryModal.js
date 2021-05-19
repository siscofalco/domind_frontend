import React, { Component } from 'react';
import DiaryService from '../../services/diary-service';

class DiaryModal extends Component {
    constructor(props){
        super(props)

        if(this.props.content && this.props.content.comment){
            this.state = {
                text: this.props.content.comment,
                isSuccess: false,
            }
        } else {
            this.state = {
                text: "",
                isSuccess: false,
            }
        }
    }

    onTextChange(value){
        this.setState({
            text: value,
        })
    }

    createDiary(){
        const diaryService = new DiaryService();
        diaryService.createDiary({ comment: this.state.text, patient: this.props.patientId })
        .then(() => {
            this.setState({
                isSuccess: true,
            })
        })
    }

    render(){
        if(this.state.isSuccess){
            return ( "ok")
        } else {
            return (
                <div>
                    <input readOnly={!this.props.isNew} value={this.state.text} onChange={(e) => {this.onTextChange(e.target.value)}}/>
                    {this.props.isNew ? <button onClick={() => { this.createDiary(this); }}>Send</button> : null}
                </div>
            )
        }
    }
}

export default DiaryModal;