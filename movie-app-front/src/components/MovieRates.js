import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';


const MovieRates = () => {
    const {movieId}  = useParams()
    const [userRates, seUserRates] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3003/rates/movie/${movieId}`)
        .then(response => response.json())
        .then(data => seUserRates(data))
        .catch(error => console.error('Error getting rates:', error));
    }, [movieId]);
  
  
    return (
    <div>
  
        <div className="user-rates">
            <h3>Oceny innych użytkowników:</h3>
            <ul>
              {userRates.map((rate, index) => (
                <div>
                    <li key={index}>{`Użytkownik: ${rate.email}`}</li>
                    <ul>
                        <li>{`Zdjęcia: ${rate.avg_r_p.toFixed(1)}`}</li>
                        <li>{`Obsada: ${rate.avg_r_ac.toFixed(1)}`}</li>
                        <li>{`Scenariusz: ${rate.avg_r_s.toFixed(1)}`}</li>
                        <li>{`Audio: ${rate.avg_r_au.toFixed(1)}`}</li>
                        <li><b>{`Ogólna ocena: ${rate.avg_r_all.toFixed(1)}`}</b></li>


                    </ul>
                </div>
              ))}
            </ul>
        </div>
    </div>
  )};

export default MovieRates;
