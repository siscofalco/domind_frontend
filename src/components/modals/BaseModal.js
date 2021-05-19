import React, { Component } from 'react';
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