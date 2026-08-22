import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import './App.css';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => (
    localStorage.getItem('theme') === 'dark'
  ));

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [isDark]);

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setIsDark((current) => !current)}
      aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
      title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
