import React, { useState, useEffect }  from 'react';
import { useLocation, Link }  from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';

const HomePage = () => {
  const location = useLocation()
  const [detailsVisible, setDetailsVisible] = useState(null);
  const [movies, setMovies] = useState([]);
  
  var userEmail = ''
  var userAdmin = false

  if(location.state){
    userEmail = location.state.userEmail
    userAdmin = location.state.isAdmin

    console.log("User email: "+ userEmail)
    console.log("User admin: "+ userAdmin)

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
        {(userEmail.length <= 0 && <Link to="/login" className='nav-elem'>Zaloguj / Stwórz konto</Link>) || <Link to="/user" state={{userEmail:userEmail, isAdmin:userAdmin}} className='nav-elem'>Konto</Link>
        }
      </nav>

      {detailsVisible && (
          <MovieDetails movie={movies.find((movie) => movie.id_movie === detailsVisible)} />
        )}
  
        <div className="movies-list">
          {movies.filter((movie) => userAdmin || movie.approved === 1)
          .map((movie) => (
            <MovieCard key={movie.id_movie} movie={movie} onClick={() => showDetails(movie.id_movie)} />
          ))}
        </div>
    </div>
  )};

export default HomePage;
