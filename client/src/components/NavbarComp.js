import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/myStore';

function NavbarComp() {
  return (
    <div>
      <nav className='navbar'>
        <nav className='nav-left'>
          <Link className='nav-link'>My Profile</Link>
          <Link className='nav-link'>Forum</Link>
          <Link className='nav-link'>Messages</Link>
        </nav>
        <div className='nav-right'>
          <Link className='nav-link'>
            <button onClick={() => useAuthStore.getState().logout()}>
              Logout
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComp;
