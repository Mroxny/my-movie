import React, { useState, useEffect }  from 'react';
import { useNavigate, useLocation, Link }  from 'react-router-dom';

const AddMoviePage = () => {
    const nav = useNavigate()
    const location = useLocation()
    const [movie, setMovie] = useState({title: '', release: ''});
    const [creator, setCreator] = useState({movie_id:'' ,name: '', surname:'', birth_date:'', role:1});
    const [movieError, setMovieError] = useState('');
    const [response, setResponse] = useState('');


  
  var userEmail = ''
  var userAdmin = false

  if(location.state){
    userEmail = location.state.userEmail
    userAdmin = location.state.isAdmin
    console.log("User email: "+ userEmail)
    console.log("User admin: "+ userAdmin)
  }

  useEffect(() => {
    fetch(`http://localhost:3003/movies`)
      .then(response => response.json())
      .then(data => setCreator({ ...creator, movie_id:data.length+1 }))
      .catch(error => console.error('Error getting movies:', error));
  }, [creator]);

  

  const addCreator = () => {
    
    fetch(`http://localhost:3003/creators`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...creator}),
            })
        .then(res => setResponse(res));

        console.log(response.status)
  }

  const addMovie = () => {

    fetch(`http://localhost:3003/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...movie}),
            })
        .then(res => setResponse(res));

        console.log(response.status)
  }




  const validateMovie = () => {
    if(movie.title.length <= 0){
        setMovieError("Nie podano nazwy filmu")
        return false
    }
    
    if(movie.release.length <= 0){
        setMovieError("Nie podano roku premiry filmu")
        return false
    }
    if(creator.name.length <= 0){
        setMovieError("Nie podano imienia")
        return false
    }
    if(creator.surname.length <= 0){
        setMovieError("Nie podano nazwiska")
        return false
    }
    if(creator.birth_date.length <= 0){
        setMovieError("Nie podano daty urodzenia osoby")
        return false
    }

    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateRegex.test(creator.birth_date)){
        setMovieError("Zły format daty")
        return false
    }
    addMovie()


    addCreator()

    setMovieError("")
    nav("/", {state: {userEmail:userEmail, isAdmin: userAdmin}})


  }


  
    return (

    <div>
        <nav>
            <Link to="/" className='nav-elem' state={{userEmail:userEmail, isAdmin:userAdmin}} >Strona Główna</Link>
        </nav>
        <div className="main-block">
        <div className="big-card-block">
            <h3>Dodaj Film</h3>
            <div className="bc-image-block">
                <input type="file" id="movie-image" name="movie-image" onChange={(e) => setMovie({ ...movie, img: e.target.value })}/>
            </div>
            <div className="bc-info-block">
                <div id="movie-info-container">
                    <p>Tytuł</p>
                    <input className="bc-input" type="text" id="movie-title" placeholder="Podaj tytuł filmu" onChange={(e) => setMovie({ ...movie, title: e.target.value })}/>
                    <p>Rok premiery</p>
                    <input className="bc-input" type="number" id="movie-year" onChange={(e) => setMovie({ ...movie, release: e.target.value })}/>
                    <p>Osoba tworząca:</p>
                    <div className="movie-creators" id="movie-creators">
                        <input className="bc-input" type="text" id="creator-name" placeholder="Imie" onChange={(e) => setCreator({ ...creator, name: e.target.value })}/>
                        <input className="bc-input" type="text" id="creator-name" placeholder="Nazwisko" onChange={(e) => setCreator({ ...creator, surname: e.target.value })}/>
                        <input className="bc-input" type="text" id="creator-name" placeholder="Urodzony (yyyy-mm-dd)" onChange={(e) => setCreator({ ...creator, birth_date: e.target.value })}/>
                        <select className="bc-input" name="people" id="creator-type" onChange={(e) => setCreator({ ...creator, role: e.target.value })}>
                            <option value="1">Reżyser</option>
                            <option value="2">Scenarzysta</option>
                            <option value="3">Aktor</option>
                        </select>
                    </div>
                </div>
                </div>
                <div className="bc-buttons-block">
                <button className="bc-button" onClick={validateMovie}>Dodaj film</button>
                </div>
                <p className="error-msg" style={{ display: movieError.length >0 ? 'block' : 'none' }} id="movie-error">{movieError}</p>

        </div>
      </div>
    </div>

  )};

export default AddMoviePage;
