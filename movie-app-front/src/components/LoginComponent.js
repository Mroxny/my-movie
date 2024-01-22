import React, {useState} from 'react';

const LoginComponent = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');


    const validateLogin = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    
        if (!emailRegex.test(loginUsername)) {
            setLoginError('Niepoprawny email');
          return false;
        }
        if (loginPassword.length <= 0) {
          setLoginError('Nie podano hasła');
          return false
        }
    
        setLoginError('');
        return true
    };


    return (
        <div className="login-block">
          <h3>Zaloguj się</h3>
            <input
              className="main-block-input"
              type="text"
              name="login-username"
              id="login-username"
              placeholder="email"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <br />
            <input
              className="main-block-input"
              type="password"
              name="login-password"
              id="login-password"
              placeholder="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <br />
            <button className="main-block-input" onClick={validateLogin}>Zaloguj</button>
            {loginError.length >0 && <p className="error-msg" style={{ display: loginError.length >0 ? 'block' : 'none' }} id="login-error">
              {loginError}
            </p>}
        </div>
    );
};

export default LoginComponent;
