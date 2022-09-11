import axios from 'axios';
import { Component, SyntheticEvent } from 'react';
import { Navigate } from 'react-router-dom';

import './Register.css';

export default class Register extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { redirect, ...data } = this.state;

    try {
      const registerUser = async () => {
        const response = await axios.post('/auth/admin/register', data);
        if (response.status === 201) {
          this.setState({
            redirect: true,
          });
        }
      };

      registerUser();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/login" />;
    }
    return (
      <main className="form-signin w-100 m-auto">
        <form onSubmit={this.submit}>
          <h1 className="h3 mb-3 fw-normal">Register</h1>
          <div className="form-floating">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={(e) => this.setState({ first_name: e.target.value })}
            ></input>
          </div>{' '}
          <div className="form-floating">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={(e) => this.setState({ last_name: e.target.value })}
            ></input>
          </div>{' '}
          <div className="form-floating">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => this.setState({ email: e.target.value })}
            ></input>
          </div>
          <div className="form-floating">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            ></input>
          </div>
          <div className="form-floating">
            <label htmlFor="passwordConfirm">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password Confirm"
              onChange={(e) => this.setState({ password_confirm: e.target.value })}
            ></input>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    );
  }
}
