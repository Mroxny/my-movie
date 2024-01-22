import React, { useState, useEffect }  from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';


const MovieRates = () => {
    const {userId}  = useParams()
    const location = useLocation()
    const [userRates, seUserRates] = useState([]);

    var userEmail = ''
    var userAdmin = false
  
    if(location.state){
      userEmail = location.state.userEmail
      userAdmin = location.state.isAdmin
  
      console.log("User email: "+ userEmail)
      console.log("User admin: "+ userAdmin)
  
    }


    useEffect(() => {
        fetch(`http://localhost:3003/rates/user/${userId}`)
        .then(response => response.json())
        .then(data => seUserRates(data))
        .catch(error => console.error('Error getting rates:', error));
    }, [userId]);
  
  
    return (
    <div>
        <nav>
            <Link to="/" className='nav-elem' state={{userEmail:userEmail, isAdmin:userAdmin}}>Strona Główna</Link>
        </nav>
        <div className="user-rates">
            <h3>Oceny użytkownika {userEmail}:</h3>
            <ul>
              {userRates.map((rate, index) => (
                <div>
                    <li key={index}>{`Film: ${rate.title}`}</li>
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
