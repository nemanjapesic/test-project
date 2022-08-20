import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b">
      <div className="navbar">
        <div className="navbar-start">
          <ul className="menu menu-horizontal gap-2 p-0">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn">Login</button>
        </div>
      </div>
    </header>
  );
}
