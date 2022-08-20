import { useSelector } from 'react-redux';
import LiveDataTable from '../components/LiveDataTable';

export default function Favorites() {
  const pairs = useSelector(({ pairs }) => pairs.data);
  const favorites = useSelector(({ favorites }) => favorites.data);

  const favoritePairs = pairs.filter((pair) => favorites.includes(pair.name));

  if (favoritePairs.length === 0)
    return (
      <div>
        <p>You didn't add any favorites yet.</p>
      </div>
    );

  return <LiveDataTable data={favoritePairs} />;
}
