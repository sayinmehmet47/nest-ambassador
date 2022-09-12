import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255),
      first_name: Yup.string().required('Must be a name').max(255),
      last_name: Yup.string().required('Must be a last name').max(255),
      password: Yup.string().max(255).required('Password is required'),
      password_confirm: Yup.string()
        .max(255)
        .required('Password confirmation is required'),
    }),
    onSubmit: () => {
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
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="First Name"
            onChange={formik.handleChange}
            name="first_name"
            onBlur={formik.handleBlur}
          ></input>
          {formik.errors.first_name && formik.touched.first_name ? (
            <div className="text-danger">{formik.errors.first_name}</div>
          ) : null}

          <label htmlFor="floatingInput">First name</label>
        </div>
        <div className="form-floating">
          <input
            type="last_name"
            className="form-control"
            id="floatingInput"
            placeholder="Last Name"
            onChange={formik.handleChange}
            name="last_name"
            onBlur={formik.handleBlur}
          ></input>
          {formik.errors.last_name && formik.touched.last_name ? (
            <div className="text-danger">{formik.errors.last_name}</div>
          ) : null}

          <label htmlFor="floatingInput">Last Name</label>
        </div>
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
        <div className="form-floating">
          <input
            type="password_confirm"
            className="form-control"
            id="floatingPassword"
            placeholder="Password Confirm"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <label htmlFor="floatingPassword">Password Confirm</label>
          {formik.errors.password_confirm && formik.touched.password_confirm ? (
            <div className="text-danger">{formik.errors.password_confirm}</div>
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
