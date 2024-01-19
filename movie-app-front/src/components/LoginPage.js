import React, {useState} from 'react';


const LoginPage = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword1, setRegPassword1] = useState('');
  const [regPassword2, setRegPassword2] = useState('');
  const [loginError, setLoginError] = useState('');
  const [regError, setRegError] = useState('');

  const validateLogin = () => {
    if (loginUsername.length <= 0) {
      setLoginError('Nie podano nazwy użytkownika');
      return false;
    }
    if (loginPassword.length <= 0) {
      setLoginError('Nie podano hasła');
      return false;
    }

    setLoginError('');
    return true;
  };

  const validateRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regUsername.length < 3) {
      setRegError('Nazwa użytkownika powinna mieć co najmniej 3 znaki');
      return false;
    }

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

      <div className="main-block">
        <div className="login-block">
          <h3>Zaloguj się</h3>
          <form action="/" onSubmit={(e) => validateLogin()}>
            <input
              className="main-block-input"
              type="text"
              name="login-username"
              id="login-username"
              placeholder="username"
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
            <button className="main-block-input">Zaloguj</button>
            <p className="error-msg" style={{ display: loginError ? '' : 'none' }} id="login-error">
              {loginError}
            </p>
          </form>
        </div>

        <p style={{ margin: '20px', textAlign: 'center' }}>-- LUB --</p>

        <div className="register-block">
          <h3>Zarejestruj się</h3>
          <form action="./logged_index.html" onSubmit={(e) => e.preventDefault() || validateRegister()}>
            <input
              className="main-block-input"
              type="text"
              name="reg-username"
              id="reg-username"
              placeholder="username"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
            />
            <br />
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
            <input className="main-block-input" type="submit" value="Zarejestruj" />
            <p className="error-msg" style={{ display: regError ? '' : 'none' }} id="reg-error">
              {regError}
            </p>
          </form>
        </div>
      </div>

  );
}

export default LoginPage;
