import React, {useState} from 'react';
import { useLocation,useNavigate, Link }  from 'react-router-dom';


const EditPasswordPage = () => {
    const nav = useNavigate()
    const location = useLocation()

    const [currentPswd, setCurrentPswd] = useState('');
    const [newPswd, setNewPswd] = useState('');
    const [repeatPswd, setRepeatPswd] = useState('');
    const [pswdError, setPswdError] = useState('');
    const [response, setResponse] = useState('');


    var userId = ''
    var userPassword = ''
    var userEmail = ''
    var isAdmin = false

    if(location.state){
        userId = location.state.userId
        userPassword = location.state.userPassword
        userEmail = location.state.userEmail
        isAdmin = location.state.isAdmin
        console.log("User email: "+ userId)
    }

    const updateUser = () => {
        fetch(`http://localhost:3003/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password: newPswd}),
            })
        .then(res => setResponse(res));
    }

    const validatePassword = () => {
    
    
        if (currentPswd === userPassword) {
            setPswdError('Niepoprawne obecne hasło');
            return false;
        }
        if (newPswd <= 0) {
            setPswdError('Nie podano nowego hasła');
            return false;
        }
        if (newPswd !== repeatPswd) {
            setPswdError('Hasła się nie zgadzają');
            return false;
        }
    
        updateUser()
        console.log("Response status: "+response.status)
        
        console.log("Zalogowano")
        setPswdError('');

        nav("/", {state: {userEmail:userEmail, isAdmin: isAdmin}})
        return true
    };


    return (
        <div>
        <nav>
            <Link to="/" className='nav-elem' state={{userEmail:userEmail, isAdmin:isAdmin}} >Strona Główna</Link>
        </nav>

  <div className="main-block">
    <div className="login-block">
        <h3>Zmień hasło</h3>
            <input className="main-block-input" type="password" placeholder="current password" id="current-password" onChange={(e) => setCurrentPswd(e.target.value)}/><br/>
            <input className="main-block-input" type="password" placeholder="new password" id="new-password1" onChange={(e) => setNewPswd(e.target.value)}/><br/>
            <input className="main-block-input" type="password" placeholder="repeat new password" id="new-password2" onChange={(e) => setRepeatPswd(e.target.value)}/><br/>
            <button className="main-block-input"  onClick={validatePassword}>Zmień Hasło</button>
            <p className="error-msg" style={{ display: pswdError.length >0 ? 'block' : 'none' }} id="password-error">{pswdError}</p>
    </div>
  </div>
  </div>
    );
};

export default EditPasswordPage;
