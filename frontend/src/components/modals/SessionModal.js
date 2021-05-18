import React, { Component } from 'react';
import SessionService from '../../services/session-service';

class SessionModal extends Component {
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
            return ( "ok")
        } else {
            return (
                <div>
                    <input readOnly={!this.props.isNew} value={this.state.text} onChange={(e) => {this.onTextChange(e.target.value)}}/>
                    {this.props.isNew ? <button onClick={() => { this.createSession(this); }}>Send</button> : null}
                </div>
            )
        }
    }
}

export default SessionModal;