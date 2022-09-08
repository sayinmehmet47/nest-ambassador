import axios from 'axios';
import { useFormik } from 'formik';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import './Login.css';
type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255),

      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: (e: any) => {
      console.log(formik.values);

      try {
        const loginUser = async () => {
          const response = await axios.post('/auth/admin/login', formik.values);
          if (response.status === 201) {
            navigate('/');
          }
        };

        loginUser();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={formik.handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
          ></input>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <label htmlFor="floatingPassword">Password</label>
          {formik.errors.password && formik.touched.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
