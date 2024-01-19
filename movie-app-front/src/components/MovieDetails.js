import React from 'react';

const MovieDetails = ({ movie }) => {
  console.log(movie)
  return (
    <div className="details-page">
      <img className='details-page-image' src={movie.img} alt={movie.title} />
      <div>
        <h2>{movie.title}</h2>
        <p>Rok produkcji: {movie.release}</p>
        <p>Średnia ocen: {}</p>
          <h3>Zaangażowani w produkcję:</h3>
          <ul>
            {movie.crew && movie.crew.map((person, index) => (
              <li key={index}>{person}</li>
            ))}
          </ul>

      </div>
    </div>
  );
};

export default MovieDetails;
