import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import Home from './pages/Home';

export default function App() {
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
