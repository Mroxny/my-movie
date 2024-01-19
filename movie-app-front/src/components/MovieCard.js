import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img className="movie-card-thumbnail" src={movie.img} alt={movie.title}/>
      <h2>{movie.title}</h2>
      <p>Rok produkcji: {movie.release}</p>
      <p>Średnia ocen: {movie.id_movie}</p>
    </div>
  );
};

export default MovieCard;
