import React, { useState, useEffect }from 'react';

const MovieDetails = ({ movie }) => {
  const [creators, setCreators] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:3003/creators/movie/${movie.id_movie}`)
      .then(response => response.json())
      .then(data => setCreators(data))
      .catch(error => console.error('Error getting creators:', error));
  }, [movie]);


  console.log("Creators: "+creators)
  return (
    <div className="details-page">
      <img className='details-page-image' src={movie.img} alt={movie.title} />
      <div>
        <h2>{movie.title}</h2>
        <p>Rok produkcji: {movie.release}</p>
        <p>Średnia ocen: {}</p>
          <h3>Zaangażowani w produkcję:</h3>
          <ul>
            {creators.map((creator, index) => (
              <li key={index}>{`${creator.person_name} ${creator.person_surname} (${creator.person_birth_date}) - ${creator.role}`}</li>
            ))}
          </ul>

      </div>
    </div>
  );
};

export default MovieDetails;
