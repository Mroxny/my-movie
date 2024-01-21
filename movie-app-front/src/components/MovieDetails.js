import React, { useState, useEffect }from 'react';
import {Link} from 'react-router-dom';


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
        {movie.avg_r_all && 
        (
          <div>
            <p><b>Ogólne oceny: {movie.avg_r_all.toFixed(1)}</b></p>
            <p>Oceny zdjęć: {movie.avg_r_p.toFixed(1)}</p>
            <p>Oceny aktorów: {movie.avg_r_ac.toFixed(1)}</p>
            <p>Oceny scenariusza: {movie.avg_r_s.toFixed(1)}</p>
            <p>Oceny dzwięku: {movie.avg_r_au.toFixed(1)}</p>
            <Link to={`/rates/movie/${movie.id_movie}`} className=''>Zobacz oceny innych użytkowników</Link>
          </div>
        )}
        {creators.length > 0 &&
        (
          <div>
            <h3>Zaangażowani w produkcję:</h3>
            <ul>
              {creators.map((creator, index) => (
                <li key={index}>{`${creator.person_name} ${creator.person_surname} (${creator.person_birth_date}) - ${creator.role}`}</li>
              ))}
            </ul>
          </div>
        )
        }


      </div>
    </div>
  );
};

export default MovieDetails;
