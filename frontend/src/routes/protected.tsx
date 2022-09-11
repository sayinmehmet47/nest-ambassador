import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Layout from '../components/Layout';
import Links from '../components/pages/Links';
import Login from '../components/pages/Login/Login';
import Orders from '../components/pages/Orders';
import ProductForm from '../components/pages/ProductForm';
import ProductPage from '../components/pages/Products/Product';
import Profile from '../components/pages/Profile';
import Register from '../components/pages/Register/Register';
import Users from '../components/pages/Users';

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/', element: <Users /> },
      { path: '/users', element: <Users /> },
      { path: '/products', element: <ProductPage /> },
      { path: '/product/:id/update', element: <ProductForm /> },
      { path: '/product/create', element: <ProductForm /> },
      { path: '/orders', element: <Orders /> },
      { path: '/orders', element: <Orders /> },
      { path: '/profile', element: <Profile /> },
      { path: 'admin/users/:id/links', element: <Links /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
