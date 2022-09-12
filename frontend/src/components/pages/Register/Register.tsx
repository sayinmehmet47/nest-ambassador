import axios from 'axios';
import { Component, SyntheticEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { z } from 'zod';

import { Form, InputField } from '../../Form';

import './Register.css';

const schema = z.object({
  first_name: z.string().min(1, 'Required'),
  last_name: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
  password_confirm: z.string().min(1, 'Required'),
});

type RegisterValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
};

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
    console.log(redirect);

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
      <main className="">
        <Form<RegisterValues, typeof schema>
          onSubmit={async (values) => {
            console.log(values);
          }}
          schema={schema}
          options={{
            shouldUnregister: true,
          }}
        >
          {({ register, formState }) => (
            <>
              <div className="form-floating">
                <InputField
                  type="text"
                  label="First Name"
                  error={formState.errors['first_name']}
                  registration={register('first_name')}
                ></InputField>
              </div>{' '}
              <div className="form-floating">
                <InputField
                  type="text"
                  label="Last Name"
                  error={formState.errors['last_name']}
                  registration={register('last_name')}
                ></InputField>
              </div>{' '}
              <div className="form-floating">
                <InputField
                  type="text"
                  label="Email"
                  error={formState.errors['email']}
                  registration={register('email')}
                ></InputField>
              </div>
              <div className="form-floating">
                <InputField
                  type="text"
                  label="Password"
                  error={formState.errors['password']}
                  registration={register('password')}
                ></InputField>
              </div>
              <div className="form-floating">
                <InputField
                  type="text"
                  label="PasswordConfirm"
                  error={formState.errors['password_confirm']}
                  registration={register('password_confirm')}
                ></InputField>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Submit
              </button>
            </>
          )}
        </Form>
      </main>
    );
  }
}
