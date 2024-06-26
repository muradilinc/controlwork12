import Layout from '../../components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFound/NotFoundPage';
import RegisterPage from '../Register/RegisterPage';
import LoginPage from '../Login/LoginPage';
import PersonImagesPage from '../PersonImages/PersonImagesPage';
import NewPost from '../NewPost/NewPost';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoutePage';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/person-image/:id" element={<PersonImagesPage />} />
          <Route
            path="/submit"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
