import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { User } from '@/models/user';

type Props = {
  user: User | null;
};

export default function Nav({ user }: Props) {
  const logout = async () => {
    await axios.post('auth/admin/logout');
  };
  return (
    <div>
      {' '}
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
          Company name
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100 rounded-0 border-0"
          type="text"
          placeholder="Search"
          aria-label="Search"
        ></input>
        <NavLink
          to="/profile"
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
        >
          {user?.first_name}☠️
          {user?.last_name}
        </NavLink>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <NavLink className="nav-link px-3" to="/login" onClick={logout}>
              Sign out
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  );
}
