import React, { Component } from 'react';

class SeeActivity extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const haveAnswers = this.props.content.answers && this.props.content.answers.length;

        return(
            <div>
                {this.props.content.questions.map((item, index) => {
                    return(
                        <div>
                            <h3>{item}</h3>
                            <p>{haveAnswers ? this.props.content.answers[index] : 'No answer'}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default SeeActivity;