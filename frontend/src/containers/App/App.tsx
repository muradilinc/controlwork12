import Layout from '../../components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFound/NotFoundPage';
import RegisterPage from '../Register/RegisterPage';
import LoginPage from '../Login/LoginPage';

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
