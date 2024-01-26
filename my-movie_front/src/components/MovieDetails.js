import React, { useState, useEffect }from 'react';
import {Link, useLocation} from 'react-router-dom';


const MovieDetails = ({ movie, userEmail }) => {
  const location = useLocation()
  const [creators, setCreators] = useState([]);
  const [user, setUser] = useState('');
  const [userRates, setUserRates] = useState('');
  const [approved, setApproved] = useState('');

  const [rate, setRate] = useState({r_p: '', r_ac: '', r_s: '', r_au: '', r_all: ''});
    const [response, setResponse] = useState('');
    const [foundRate, setFoundRate] = useState('');
    const [rateError, setRateError] = useState('');


    var userAdmin = false
  
    if(location.state){
      userAdmin = location.state.isAdmin
      console.log("User admin: "+ userAdmin)
    }
  var movieId = movie.id_movie

  useEffect(() => {
    fetch(`http://localhost:3003/creators/movie/${movie.id_movie}`)
      .then(response => response.json())
      .then(data => setCreators(data))
      .catch(error => console.error('Error getting creators:', error));
  }, [movie]);

  useEffect(() => {
    fetch(`http://localhost:3003/users/email/${userEmail}`)
      .then(response => response.json())
      .then(data => setUser(data[0]))
      .catch(error => console.error('Error getting user:', error));
  }, [userEmail]);

  useEffect(() => {
    fetch(`http://localhost:3003/rates/user/${user ? user.id_user : 0}`)
      .then(response => response.json())
      .then(data => setUserRates(data))
      .catch(error => console.error('Error getting user:', error));
  }, [user]);
  console.log("Creators: "+creators)

  const addRate = () => {
    fetch(`http://localhost:3003/rates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...rate,movie_id: movie.id_movie, user_id: user.id_user}),
            })
        .then(res => setResponse(res));

        console.log(response.status)
  }

  const updateMovie = () => {
    console.log(approved)
    fetch(`http://localhost:3003/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({approved: 1}),
            })
        .then(res => setResponse(res));

        console.log(response.status)
  }

  const deleteMovie = () => {
    console.log(approved)
    fetch(`http://localhost:3003/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({approved: 1}),
            })
        .then(res => setResponse(res));

        console.log(response.status)
  }

  const updateRate = () => {
    var idUser = foundRate.id_user
    fetch(`http://localhost:3003/rates/${idUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...rate,movie_id: movie.id_movie, user_id: user.id_user}),
            })
        .then(res => setResponse(res));

        console.log(response.status)
  }

  const validateRate = () => {
    if(rate.r_p < 1 || rate.r_p > 10){
      setRateError("Ocenna powinna być od 1 do 10")
      return false
    }
    if(rate.r_ac < 1 || rate.r_ac > 10){
      setRateError("Ocenna powinna być od 1 do 10")
      return false
    }
    if(rate.r_s < 1 || rate.r_s > 10){
      setRateError("Ocenna powinna być od 1 do 10")
      return false
    }
    if(rate.r_au < 1 || rate.r_au > 10){
      setRateError("Ocenna powinna być od 1 do 10")
      return false
    }
    if(rate.r_all < 1 || rate.r_all > 10){
      setRateError("Ocenna powinna być od 1 do 10")
      return false
    }

    
    setFoundRate(userRates.find((e) => e.title === movie.title))
    if (foundRate !== undefined){
      console.log("Found rate: "+ Object.keys(foundRate))
      updateRate()
    }
    else{
      addRate()
    }
    setRateError("")
  }


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
        {user && 
        (
          <div>
            {/* r_p, r_ac, r_s, r_au, r_all */}
            <input className="top-bar-elem" type="number" placeholder="Zdjęcia" onChange={(e) => setRate({ ...rate, r_p: e.target.value })}/> 
            <input className="top-bar-elem" type="number" placeholder="Obsada" onChange={(e) => setRate({ ...rate, r_ac: e.target.value })}/> 
            <input className="top-bar-elem" type="number" placeholder="Scenariusz" onChange={(e) => setRate({ ...rate, r_s: e.target.value })}/>
            <input className="top-bar-elem" type="number" placeholder="Audio" onChange={(e) => setRate({ ...rate, r_au: e.target.value })}/> 
            <input className="top-bar-elem" type="number" placeholder="Ogólna" onChange={(e) => setRate({ ...rate, r_all: e.target.value })}/> 

            <p className="error-msg" style={{ display: rateError.length >0 ? 'block' : 'none' }} id="movie-error">{rateError}</p>

            <button className="top-bar-elem" onClick={validateRate}>Oceń</button>

          </div>
        )}

        {user && user.isAdmin > 0 && 
        (
          <div>
            <input class="top-bar-elem" type="checkbox" onChange={(e) => setApproved( e.target.value )} onClick={updateMovie}/> Zatwierdzono
            <Link to={`/editMovie/${movieId}`} state={{userEmail:userEmail, isAdmin:userAdmin}} className="top-bar-elem">Edytuj film</Link>
            <button className="top-bar-elem" onClick={deleteMovie} >Usuń film</button>


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
