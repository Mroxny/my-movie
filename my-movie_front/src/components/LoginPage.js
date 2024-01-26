import React from 'react';
import { Link }  from 'react-router-dom';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';


const LoginPage = () => {

  return (
    <div>
      <nav>
        <Link to="/" className='nav-elem'>Strona Główna</Link>
      </nav>
      <div className="main-block">
        <LoginComponent/>

        <p style={{ margin: '20px', textAlign: 'center' }}>-- LUB --</p>

        <RegisterComponent/>
      </div>
    </div>

  );
}

export default LoginPage;
