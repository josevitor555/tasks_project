// Style CSS
import './App.css'

// React Router dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Dashboard';

const Home = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path='/' element={<LoginPage />} />

        {/* Dashboard */}
        <Route path='/dashboard' element={<HomePage />} />
        
        {/* Page not found */}
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Home;
