import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CreateProduct from './components/pages/CreateProduct';
import Links from './components/pages/Links';
import Login from './components/pages/Login/Login';
import ProductPage from './components/pages/Products/Product';
import Register from './components/pages/Register/Register';
import Users from './components/pages/Users';

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
          <Route path="/product/create" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
