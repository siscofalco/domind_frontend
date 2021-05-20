import React, { Component } from 'react'
import { withAuth } from '../../context/auth.context';
import { TextField, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Signup.css';

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
    } else if(value.length < 3){
      message = 'Invalid password'
    }

    return message;
  },
  mobilephone: (value) => {
    let message;
    if(!value){
      message = 'Phone number is required';
    } else if(value.length < 9){
      message = 'Invalid phone number'
    }

    return message;
  },
}

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      isError: false,
      fields: {
        username: "",
        name: "",
        email: "",
        password: "",
        mobilephone: null,
      },
      errors: {
        username: null,
        name: null,
        email: null,
        password: null,
        mobilephone: null,
      }
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const data = {
        ...this.state.fields,
    };
    this.setState({isError: false});
    this.props.signup(data).then((response) => {
      if (!response) {
        this.setState({
          isError: true,
        })
      }
    });
  }

  handleChange(event){
    const { name, value } = event.target;
    let finalValue = value;
    if (name === 'username') {
      finalValue = finalValue.replace(/ /g, '').toLowerCase();
    }
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: finalValue
      },
      errors: {
        ...this.state.errors,
        [name]: validators[name](finalValue)
      }
    })
  }

  render() {
    const { fields, errors, isError } = this.state;
    return (
      <div className="signup">
        <a className="backIcon" href="/login"><ArrowBackIosIcon /></a>
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-item">
            <TextField
              type="text"
              placeholder="Username"
              name="username"
              value={fields.username}
              onChange={(e) => this.handleChange(e)}
              error={!!errors.username}
              helperText={errors.username}
            />
          </div>

          <div className="form-item">
            <TextField
              type="text"
              placeholder="Name"
              name="name"
              value={fields.name}
              onChange={(e) => this.handleChange(e)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </div>

          <div className="form-item">
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              value={fields.password}
              onChange={(e) => this.handleChange(e)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>

          <div className="form-item">
            <TextField
              type="tel"
              placeholder="Mobile Phone"
              name="mobilephone"
              value={fields.mobilephone}
              onChange={(e) => this.handleChange(e)}
              error={!!errors.mobilephone}
              helperText={errors.mobilephone}
            />
          </div>

          <div className="form-item">
            <TextField
              type="text"
              placeholder="Email"
              name="email"
              value={fields.email}
              onChange={(e) => this.handleChange(e)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>

          <Button type="submit" variant="outlined" color={isError ? 'secondary' : 'primary'} >
            Create user
          </Button>
        </form>
      </div>
    )
  }
}

export default withAuth(Signup);
