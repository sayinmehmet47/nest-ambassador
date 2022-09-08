import './Register.css';

import React, { Component, SyntheticEvent } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

type Props = {};

type State = {};

export default class Register extends Component<Props, State> {
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
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={(e) => (this.state.first_name = e.target.value)}
            ></input>
            <label htmlFor="floatingInput">First Name</label>
          </div>{' '}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={(e) => (this.state.last_name = e.target.value)}
            ></input>
            <label htmlFor="floatingInput">Last Name</label>
          </div>{' '}
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => (this.state.email = e.target.value)}
            ></input>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => (this.state.password = e.target.value)}
            ></input>
            <label>Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password Confirm"
              onChange={(e) => (this.state.password_confirm = e.target.value)}
            ></input>
            <label>Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    );
  }
}
