import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useErrStore } from '../store/myStore';

function LoginPage() {
  const { setUserInfo, isLoggedIn, setAutoLoginEnabled } = useAuthStore();
  const { error, setError, clearError } = useErrStore();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const login = async () => {
    clearError();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch('http://localhost:2400/login', options);
      const data = await response.json();
      if (response.ok && data.success) {
        setUserInfo({
          username: data.data.username,
          token: data.data.token,
          role: data.data.role,
        });
        navigate('/');
      } else {
        setError(data.message || 'Unable to log in. Please try again.');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleAutoLoginChange = (e) => {
    setAutoLoginEnabled(e.target.checked);
  };

  return (
    <div className='login-form'>
      <input type='text' ref={usernameRef} placeholder='username' />
      <input type='password' ref={passwordRef} placeholder='password' />
      <div className='select-autologin'>
        <input type='checkbox' onChange={handleAutoLoginChange} />
        <h6>Auto Login</h6>
      </div>
      <button type='submit' onClick={login}>
        Login
      </button>
      {error && (
        <p className='error' style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default LoginPage;
