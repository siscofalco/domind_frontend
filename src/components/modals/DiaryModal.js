import React, { Component } from 'react';
import DiaryService from '../../services/diary-service';
import { Button } from '@material-ui/core';
import { getDateFormat } from '../../helpers/helpers';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class DiaryModal extends Component {
    constructor(props){
        super(props)

        if(this.props.content && this.props.content.comment){
            this.state = {
                text: this.props.content.comment,
                date: this.props.content.date,
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
            return (<CheckCircleIcon />)
        } else {
            return (
                <div className="textModal">
                    {!this.props.isNew ? <div className="modalTitle">{getDateFormat(this.state.date)}</div> : null}
                    <textarea readOnly={!this.props.isNew} value={this.state.text} onChange={(e) => {this.onTextChange(e.target.value)}}/>
                    {this.props.isNew ? <Button onClick={() => { this.createDiary(this); }}>Send</Button> : null}
                </div>
            )
        }
    }
}

export default DiaryModal;