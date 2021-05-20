import React, { Component } from 'react';
import SessionService from '../../services/session-service';
import { Button } from '@material-ui/core';
import { getDateFormat } from '../../helpers/helpers';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class SessionModal extends Component {
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

    createSession(){
        const sessionService = new SessionService();
        sessionService.createSession({ comment: this.state.text, patient: this.props.patientId })
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
                    {this.props.isNew ? <Button onClick={() => { this.createSession(this); }}>Send</Button> : null}
                </div>
            )
        }
    }
}

export default SessionModal;