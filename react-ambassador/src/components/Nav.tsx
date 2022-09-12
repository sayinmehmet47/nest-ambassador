import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/frontend" className="nav-link px-2 link-secondary">
              Frontend
            </a>
          </li>

          <li>
            <a href="/backend" className="nav-link px-2 link-dark">
              Backend
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <NavLink to={'/login'}>
            <button type="button" className="btn btn-outline-primary me-2">
              Login
            </button>
          </NavLink>
          <NavLink to={'/register'}>
            <button type="button" className="btn btn-primary">
              Sign-up
            </button>
          </NavLink>
        </div>
      </header>
    </div>
  );
};
