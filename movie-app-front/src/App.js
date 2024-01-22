import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import LoginPage from './components/LoginPage';
import './App.css';
import MovieRates from './components/MovieRates';


const App = () => {


  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Movie App</h1>
        </header>

        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/rates/movie/:movieId" element={<MovieRates/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <div className="footer">
          <p>Wykonał: Maciej Mrozek s24921</p>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
