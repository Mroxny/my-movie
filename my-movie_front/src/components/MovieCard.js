import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img className="movie-card-thumbnail" src={movie.img} alt={movie.title}/>
      <h2>{movie.title}</h2>
      <p>Rok produkcji: {movie.release}</p>
      {(movie.avg_r_all && (<p>Średnia ocen: {movie.avg_r_all.toFixed(1)}</p>)) || (<p>Brak ocen</p>)}
    </div>
  );
};

export default MovieCard;
