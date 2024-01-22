import React, { useState, useEffect }  from 'react';
import { useLocation, Link }  from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';

const HomePage = () => {
  const location = useLocation()
  const [detailsVisible, setDetailsVisible] = useState(null);
  const [movies, setMovies] = useState([]);
  
  var userEmail = ''

  if(location.state){
    console.log("Location state: "+ location.state.userEmail)
    userEmail = location.state.userEmail
  }


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
      <nav>
        <Link to="/" className='nav-elem'>Strona Główna</Link>
        {(userEmail.length <= 0 && <Link to="/login" className='nav-elem'>Zaloguj / Stwórz konto</Link>) || <Link to="/login" className='nav-elem'>Konto</Link>
        }
      </nav>

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
