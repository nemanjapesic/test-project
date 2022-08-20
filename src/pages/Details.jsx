import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPairDetails } from '../services/pairs.services';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/favorites/favorites.slice';

export default function Details() {
  const { id: symbolId } = useParams();
  const [pairDetails, setPairDetails] = useState(null);

  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const favorites = useSelector(({ favorites }) => favorites.data);
  const dispatch = useDispatch();

  const fetchPairDetails = async () => {
    const data = await getPairDetails(symbolId);

    setPairDetails(data);
  };

  useEffect(() => {
    fetchPairDetails();
    // eslint-disable-next-line
  }, [symbolId]);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(symbolId));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(symbolId));
  };

  if (!pairDetails) return null;

  const { SYMBOL, LAST_PRICE, HIGH, LOW } = pairDetails;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Last</th>
              <th>High</th>
              <th>Low</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{SYMBOL.slice(1)}</th>
              <td>{LAST_PRICE}</td>
              <td>{HIGH}</td>
              <td>{LOW}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 float-right">
        {isAuthenticated &&
          (!favorites.includes(symbolId) ? (
            <button className="btn btn-sm border-none bg-primary" onClick={handleAddToFavorites}>
              Add to Favorites
            </button>
          ) : (
            <button
              className="btn btn-sm border-none bg-red-500"
              onClick={handleRemoveFromFavorites}
            >
              Remove from Favorites
            </button>
          ))}
      </div>
    </div>
  );
}
