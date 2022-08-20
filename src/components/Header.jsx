import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/auth/auth.slice';

export default function Header() {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <header className="border-b">
      <div className="navbar">
        <div className="navbar-start">
          <ul className="menu menu-horizontal gap-2 p-0">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? 'text-primary font-bold' : '')}
                to="/"
              >
                Home
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? 'text-primary font-bold' : '')}
                  to="/favorites"
                >
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {!isAuthenticated && (
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
