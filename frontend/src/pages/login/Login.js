import React, { Component } from 'react'
import { withAuth } from '../../context/auth.context';

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
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-item">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={fields.username} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className="form-item">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={fields.password} onChange={(e) => this.handleChange(e)} />
        </div>

        <button type="submit">
          Log in
        </button>
      </form>
    )
  }
}

export default withAuth(Login);