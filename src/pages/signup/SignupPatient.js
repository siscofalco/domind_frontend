import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withAuth } from '../../context/auth.context';
import AuthService from '../../services/auth-service';
import { TextField, Button } from '@material-ui/core';

const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const validators = {
    username: (value) => {
      let message;
      if(!value){
        message = 'Username is required';
      }
  
      return message;
    },
    name: (value) => {
      let message;
      if(!value){
        message = 'Name is required';
      }
  
      return message;
    },
    birthdate: (value) => {
        let message;
        if(!value){
          message = 'Birthdate is required';
        }
    
        return message;
    },
    email: (value) => {
      let message;
      if(!value){
        message = 'Email is required';
      } else if(!EMAIL_PATTERN.test(value)){
        message = 'Invalid email';
      }
  
      return message;
    },
    password: (value) => {
      let message;
      if(!value){
        message = 'Password is required';
      } else if(value.length < 5){
        message = 'Invalid password'
      }
      return message;
    }
}

class NewPatient extends Component{
    constructor(props){
        super(props)
        this.state = {
            fields: {
              username: "",
              name: "",
              email: "",
              password: "",
              birthdate: null,
            },
            errors: {
              username: null,
              name: null,
              email: null,
              password: null,
              birthdate: null,
            }
          }
    }

    componentDidMount(){
        console.log(this.props)
    }

    handleSubmit(event){
        event.preventDefault();
        const data = {
            ...this.state.fields,
        };
        const authService = new AuthService();
        authService.signupPatient(data)
        .then(()=>{
            window.location.reload();
        })
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

    
    render(){
        if(this.props.user && this.props.user.data && Array.isArray(this.props.user.data.patients)){
            return (
              <div className="signup">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                  <div className="form-item">
                    <TextField type="text" placeholder="Username" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
                  </div>

                  <div className="form-item">
                    <TextField type="text" placeholder="Name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                  </div>

                  <div className="form-item">
                    <TextField type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                  </div>

                  <div className="form-item">
                    <TextField type="date" placeholder="Birthdate" name="birthdate" value={this.state.birthdate} onChange={(e) => this.handleChange(e)} />
                  </div>

                  <div className="form-item">
                    <TextField type="text" placeholder="Email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} />
                  </div>
                  <Button type="submit" variant="outlined" color="primary">Create patient</Button>
              </form>
              </div>
            )
        } else {
            return(
                <Redirect to='/user-selector' />
            )
        }
    }
}

export default withAuth(NewPatient);