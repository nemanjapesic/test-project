import { useSelector } from 'react-redux';
import LiveDataTable from '../components/LiveDataTable';

export default function Home() {
  const pairs = useSelector(({ pairs }) => pairs.data);

  if (pairs.length === 0) return null;

  return <LiveDataTable data={pairs} />;
}
