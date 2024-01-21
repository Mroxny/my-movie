import React, {useState} from 'react';

const RegisterComponent = () => {
    const [regEmail, setRegEmail] = useState('');
    const [regPassword1, setRegPassword1] = useState('');
    const [regPassword2, setRegPassword2] = useState('');
    const [regError, setRegError] = useState('');


    const validateRegister = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    
        if (!emailRegex.test(regEmail)) {
          setRegError('Niepoprawny email');
          return false;
        }
    
        if (regPassword1.length < 8) {
          setRegError('Hasło powinno mieć co najmniej 8 znaków');
          return false;
        }
    
        if (regPassword1 !== regPassword2) {
          setRegError('Hasła się nie zgadzają');
          return false;
        }
    
        setRegError('');
        return true;
      };


    return (
        <div className="register-block">
          <h3>Zarejestruj się</h3>
            <input
              className="main-block-input"
              type="email"
              name="reg-email"
              id="reg-email"
              placeholder="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <br />
            <input
              className="main-block-input"
              type="password"
              name="reg-password1"
              id="reg-password1"
              placeholder="password"
              value={regPassword1}
              onChange={(e) => setRegPassword1(e.target.value)}
            />
            <br />
            <input
              className="main-block-input"
              type="password"
              name="reg-password2"
              id="reg-password2"
              placeholder="repeat password"
              value={regPassword2}
              onChange={(e) => setRegPassword2(e.target.value)}
            />
            <br />
            <button className="main-block-input" onClick={validateRegister}>Zarejestruj</button>
            <p className="error-msg" style={{ display: regError ? 'block' : 'none' }} id="reg-error">
              {regError}
            </p>
        </div>
    );
};

export default RegisterComponent;
