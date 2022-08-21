import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../redux/favorites/favorites.slice';

export default function LiveDataTable({ data }) {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const favorites = useSelector(({ favorites }) => favorites.data);
  const dispatch = useDispatch();

  const handleAddToFavorites = (symbolId) => {
    dispatch(addToFavorites(symbolId));
  };

  const handleRemoveFromFavorites = (symbolId) => {
    dispatch(removeFromFavorites(symbolId));
  };

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Price</th>
            <th>Change</th>
            <th>Change Percent</th>
            <th>High</th>
            <th>Low</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ name, lastPrice, dailyChange, dailyChangeRelative, high, low }) => (
            <tr key={name}>
              <th>
                <Link to={`/details/${name}`}>{name}</Link>
              </th>
              <td>{lastPrice}</td>
              <td>{dailyChange}</td>
              <td>{dailyChangeRelative}</td>
              <td>{high}</td>
              <td>{low}</td>
              <td>
                {isAuthenticated &&
                  (!favorites.includes(name) ? (
                    <button
                      onClick={handleAddToFavorites.bind(this, name)}
                      title="Add to Favorites"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={handleRemoveFromFavorites.bind(this, name)}
                      title="Remove from Favorites"
                    >
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="currentColor"
                        stroke="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </button>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
