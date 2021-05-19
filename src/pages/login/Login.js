import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { withAuth } from '../../context/auth.context';
import './Login.css';

const validators = {
  username: (value) => {
    let message;
    if(!value){
      message = 'Username is required';
    } 
  },
  password: (value) => {
    let message;
    if(!value){
      message = 'Password is required';
    } else if(value.length < 3){
      message = 'Invalid password'
    }
    return message;
  },
}

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {
        username: "",
        password: ""
      },
      errors: {
        username: null,
        password: null
      }
    }
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.login(this.state.fields);
  }

  handleChange(event){
    const { name, value } = event.target;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validators[name](value)
      }
    })
  }

  render() {
    const { fields } = this.state;
    return (
      <div className="login">
        <span className="title">Domind</span>
        <span className="subtitle">Mental health dashboard</span>
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-item">
            <TextField type="text" placeholder="Username" name="username" value={fields.username} onChange={(e) => this.handleChange(e)} />
          </div>

          <div className="form-item">
            <TextField type="password" placeholder="Password" name="password" value={fields.password} onChange={(e) => this.handleChange(e)} />
          </div>

          <Button variant="outlined" color="primary" type="submit">
            Log in
          </Button>
        </form>
        <a className="footer" href="/signup">Are you a doctor? Create your account here</a>
      </div>
    )
  }
}

export default withAuth(Login);