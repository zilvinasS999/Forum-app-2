import React from 'react';
import { useRef, useEffect } from 'react';
import useStore from '../store/myStore';

function RegisterPage() {
  const { error, success, setError, setSuccess, clearError, clearSuccess } =
    useStore();
  const usernameRef = useRef();
  const passwordOneRef = useRef();
  const passwordTwoRef = useRef();
  const roleRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await register();
  };

  const register = async () => {
    clearError();
    setSuccess(null);

    const user = {
      username: usernameRef.current.value,
      passwordOne: passwordOneRef.current.value,
      passwordTwo: passwordTwoRef.current.value,
      role: roleRef.current.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch('http://localhost:2400/register', options);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      clearError();
      console.log('Registration successful:', data);
      setSuccess('Registration successful. You can now log in.');

      usernameRef.current.value = '';
      passwordOneRef.current.value = '';
      passwordTwoRef.current.value = '';
    } catch (error) {
      setError(error.message);
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   }
  // }, [error]);
  return (
    <div>
      <form className='register-form' onSubmit={handleFormSubmit}>
        <input type='text' placeholder='Username' ref={usernameRef} required />
        <input
          type='password'
          placeholder='Password'
          ref={passwordOneRef}
          required
        />
        <input
          type='password'
          placeholder='Confirm password'
          ref={passwordTwoRef}
          required
        />
        <select
          name='role-select'
          ref={roleRef}
          defaultValue='Select Role'
          required
        >
          <option disabled>Selected Role</option>
          <option value='admin'>Admin</option>
          <option value='user'>User</option>
        </select>
        <button type='submit'>Register</button>
        {error && (
          <p className='error' style={{ color: 'red' }}>
            {error}
          </p>
        )}
        {success && (
          <p className='success' style={{ color: 'green' }}>
            {success}
          </p>
        )}
      </form>
    </div>
  );
}

export default RegisterPage;
