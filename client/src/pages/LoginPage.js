import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useAuthStore, useErrStore, useProfileStore } from '../store/myStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const {
    setToken,
    setIsLoggedIn,
    setAutoLoginEnabled,
    setUsername,
    isLoggedIn,
    setUserInfo,
  } = useAuthStore();
  const { error, success, setError, setSuccess, clearError, clearSuccess } =
    useErrStore();
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
    setSuccess(null);

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

      console.log('Response data:', data);
      if (!response.ok || !data.success) {
        setError(data.message || 'Unable to log in. Please try again.');
        return;
      }

      setToken(data.data.token);
      setUsername(data.data.username);
      setUserInfo(data.data.role);
      localStorage.setItem('username', data.data.username);
      console.log('Username set to:', data.data.username);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      setError('An unexpected error. Please try again later.');
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
