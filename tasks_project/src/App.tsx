// Style CSS
import './App.css'

// React Router dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/LoginPage';

const Home = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path='/' element={<HomePage />} />

        {/* Page not found */}
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Home;
