import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import useLiveData from './hooks/useLiveData';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import Home from './pages/Home';

import { useDispatch } from 'react-redux';
import { update } from './redux/pairs/pairs.slice';

export default function App() {
  const data = useLiveData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length === 5) {
      dispatch(update(data));
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute redirectTo="/">
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
