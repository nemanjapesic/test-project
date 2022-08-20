import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPairDetails } from '../services/pairs.services';

export default function Details() {
  const { id: symbolId } = useParams();
  const [pairDetails, setPairDetails] = useState(null);

  const fetchPairDetails = async () => {
    const data = await getPairDetails(symbolId);

    setPairDetails(data);
  };

  useEffect(() => {
    fetchPairDetails();
  }, [symbolId]);

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
    </div>
  );
}
