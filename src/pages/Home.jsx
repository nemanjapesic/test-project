import { useSelector } from 'react-redux';
import LiveDataTable from '../components/LiveDataTable';
import Loader from '../components/Loader';

export default function Home() {
  const pairs = useSelector(({ pairs }) => pairs.data);

  if (pairs.length === 0) return <Loader />;

  return <LiveDataTable data={pairs} />;
}
