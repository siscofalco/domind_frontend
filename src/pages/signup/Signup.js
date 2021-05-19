import React, { Component } from 'react'
import { withAuth } from '../../context/auth.context';
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
      fields: {
        username: "",
        name: "",
        email: "",
        password: "",
        mobilephone: null,
        email: "",
      },
      errors: {
        username: null,
        name: null,
        email: null,
        password: null,
        mobilephone: null,
        email: null,
      }
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const data = {
        ...this.state.fields,
    };
    this.props.signup(data);
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
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-item">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={fields.username} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className="form-item">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={fields.name} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className="form-item">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={fields.password} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className="form-item">
          <label htmlFor="mobilephone">Mobilephone: </label>
          <input type="tel" name="mobilephone" value={fields.mobilephone} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className="form-item">
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" value={fields.email} onChange={(e) => this.handleChange(e)} />
        </div>

        <button type="submit">
          Create user
        </button>
      </form>
    )
  }
}

export default withAuth(Signup);
