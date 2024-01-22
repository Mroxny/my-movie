import React, { useState, useEffect }  from 'react';
import { useLocation, Link }  from 'react-router-dom';

const UserPage = () => {
  const location = useLocation()
  const [user, setUser] = useState('');
  const [rates, setRates] = useState('');
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
    fetch(`http://localhost:3003/users/email/${userEmail}`)
      .then(response => response.json())
      .then(data => setUser(data[0]))
      .catch(error => console.error('Error getting movies:', error));
  }, [userEmail]);


  useEffect(() => {
    fetch(`http://localhost:3003/rates/user/${user.id_user}`)
      .then(response => response.json())
      .then(data => setRates(data))
      .catch(error => console.error('Error getting movies:', error));
  }, [user]);

  const handleFileChange = (event) => {
    const file = event.target.value;
    console.log("File path: "+ file)

    fetch(`http://localhost:3003/users/${user.id_user}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({img: file}),
            })
        .then(res => setResponse(res));

    console.log("Status: "+ response.status)
  };
  
    return (

    <div>
        <nav>
            <Link to="/" className='nav-elem' state={{userEmail:userEmail, isAdmin:userAdmin}} >Strona Główna</Link>
        </nav>
        <div class="main-block">
        <div class="big-card-block">
            <h3>Panel Użytkownika</h3>
            <div class="bc-image-block">
                <p><img src={user.img} alt={user.email}/></p>
                <input type="file" id="user-image" name="user-image" onChange={handleFileChange}/>
            </div>
            <div class="bc-info-block">
                <p>Email: {user.email}</p>
                <p>Ocenione filmy: {rates.length} <Link to={`/rates/user/${user.id_user}`} state={{userEmail:userEmail, isAdmin:userAdmin}} className='bc-button'>Zobacz</Link></p>
            </div>
            <div class="bc-buttons-block">
                <Link className="bc-button" to="/">Dodaj Film</Link>
                <Link className="bc-button" to="/editPassword" state={{userEmail:userEmail, isAdmin:userAdmin, userId:user.id_user, userPassword: user.password}}>Zmień Hasło</Link>
                <Link className="bc-button" to="/">Wyloguj się</Link>
            </div>
        </div>
      </div>
    </div>

  )};

export default UserPage;
