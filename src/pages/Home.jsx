import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
  const pairs = useSelector(({ pairs }) => pairs.data);

  if (pairs.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last</th>
            <th>Change</th>
            <th>Change Percent</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(
            ({ name, data: { LAST_PRICE, DAILY_CHANGE, DAILY_CHANGE_RELATIVE, HIGH, LOW } }) => (
              <tr key={name}>
                <th>
                  <Link to={`/details/${name}`}>{name}</Link>
                </th>
                <td>{LAST_PRICE}</td>
                <td>{DAILY_CHANGE}</td>
                <td>{DAILY_CHANGE_RELATIVE}</td>
                <td>{HIGH}</td>
                <td>{LOW}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
