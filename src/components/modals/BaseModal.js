import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './BaseModal.css';

class BaseModal extends Component {
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.visible === true){
            return(
                <div className="modal-background" onClick={this.props.onModalClose}>
                    <div className="modal-container" onClick={(e) => {e.stopPropagation()}}>
                        <div className="modalCloseButton" onClick={this.props.onModalClose}><CloseIcon /></div>
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default BaseModal;