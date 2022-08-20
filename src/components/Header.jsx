import { Link } from 'react-router-dom';
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
              <Link to="/">Home</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/favorites">Favorites</Link>
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
