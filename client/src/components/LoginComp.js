import React from 'react';

function LoginComp() {
  return (
    <div className='login-form'>
      <input type='text' />
      <input type='password' />
      <div className='select-autologin'>
        <input type='checkbox' />
        <h6>Auto Login</h6>
      </div>
      <button type='submit'>Loginn</button>
    </div>
  );
}

export default LoginComp;
