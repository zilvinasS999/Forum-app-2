import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore, useForumStore } from '../store/myStore';

function NavbarComp() {
  const { logout, userId } = useAuthStore((state) => ({
    logout: state.logout,
    userId: state.userId,
  }));

  const { mainTopicId } = useAuthStore((state) => ({
    mainTopicId: state.mainTopicId,
  }));

  return (
    <div>
      <nav className='navbar'>
        <nav className='nav-left'>
          <Link to={`/profile/${userId}`} className='nav-link'>
            My Profile
          </Link>
          <Link to='/' className='nav-link'>
            Forum
          </Link>
          <Link className='nav-link'>Messages</Link>
        </nav>

        <Link className='nav-link'></Link>

        <Link to={`/${mainTopicId}`} className='nav-link'>
          SubTopics
        </Link>
        <div className='nav-right'>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComp;
