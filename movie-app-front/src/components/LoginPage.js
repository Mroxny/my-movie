import React from 'react';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';


const LoginPage = () => {

  return (

      <div className="main-block">
        <LoginComponent/>

        <p style={{ margin: '20px', textAlign: 'center' }}>-- LUB --</p>

        <RegisterComponent/>
      </div>

  );
}

export default LoginPage;
