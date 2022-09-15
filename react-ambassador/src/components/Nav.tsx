import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useLogoutUserMutation } from '../services/users';

export const Nav = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutUserMutation();

  const handleLogout = async () => {
    await logout({});
  };
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

        <div className="col-md-3 text-end d-flex justify-content-center align-items-center">
          {user.first_name ? (
            <div className="d-flex text-secondary">
              <NavLink to="/user" className="nav-link px-2 fw-bold">
                {user.first_name}
              </NavLink>
              <NavLink to="/stats" className="nav-link px-2 fw-bold">
                Stats
              </NavLink>
            </div>
          ) : (
            <NavLink to={'/login'}>
              <button type="button" className="btn btn-outline-primary me-2">
                Login
              </button>
            </NavLink>
          )}
          {user.first_name ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <NavLink to={'/register'}>
              <button type="button" className="btn btn-primary">
                Sign-up
              </button>
            </NavLink>
          )}
        </div>
      </header>
    </div>
  );
};
