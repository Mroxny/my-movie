import React, { useState, useEffect }  from 'react';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';

const HomePage = () => {
    const [detailsVisible, setDetailsVisible] = useState(null);
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3003/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error getting movies:', error));
  }, []);
  
    const showDetails = (movieId) => {
      setDetailsVisible(movieId);
    };
  
    return (
    <div>
        <div className="top-bar">
        <input className="search-bar-elem" type="text" placeholder='Wyszukaj...'/>
        <button className="search-bar-elem" type="button"><i className="fa fa-search"></i></button>
        </div>

      {detailsVisible && (
          <MovieDetails movie={movies.find((movie) => movie.id_movie === detailsVisible)} />
        )}
  
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id_movie} movie={movie} onClick={() => showDetails(movie.id_movie)} />
          ))}
        </div>
    </div>
  )};

export default HomePage;
