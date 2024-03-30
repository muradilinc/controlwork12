import Layout from '../../components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFound/NotFoundPage';
import RegisterPage from '../Register/RegisterPage';
import LoginPage from '../Login/LoginPage';
import PersonImagesPage from '../PersonImages/PersonImagesPage';
import NewPost from '../NewPost/NewPost';

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/person-image/:id" element={<PersonImagesPage />} />
          <Route path="/submit" element={<NewPost />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
