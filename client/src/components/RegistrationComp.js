import React from 'react';

function RegistrationComp() {
  return (
    <div className='register-form'>
      <input type='text' placeholder='Username' />
      <input type='password' placeholder='Password' />
      <input type='password' placeholder='Confirm password' />
      <select name='role-select'>
        <option selected>Selected Role</option>
        <option value='admin'>Admin</option>
        <option value='user'>User</option>
      </select>
      <button type='submit'>Register</button>
    </div>
  );
}

export default RegistrationComp;
