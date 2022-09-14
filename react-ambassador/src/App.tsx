import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import ProductsBackend from './pages/ProductBackend';
import ProductsFrontend from './pages/ProductsFrontend';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsFrontend />} />
        <Route path="/frontend" element={<ProductsFrontend />} />
        <Route path="/backend" element={<ProductsBackend />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
