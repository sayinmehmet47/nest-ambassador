import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import UserStats from './components/UserStats';
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
        <Route path="/stats" element={<UserStats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
