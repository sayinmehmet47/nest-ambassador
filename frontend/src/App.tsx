import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Links from './components/pages/Links';
import Login from './components/pages/Login/Login';
import ProductPage from './components/pages/Products/Product';
import Register from './components/pages/Register/Register';
import Users from './components/pages/Users';
import ProductForm from './components/pages/ProductForm';
import Orders from './components/pages/Orders';
import Profile from './components/pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="admin/users/:id/links" element={<Links />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/create" element={<ProductForm />} />
          <Route path="/product/:id/update" element={<ProductForm />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
