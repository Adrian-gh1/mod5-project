// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div className='header'>
        <div className='logo'>
          <NavLink to='/'>
            <img src='/favicon.ico' alt='Logo' />
          </NavLink>
        </div>
        <div className='auth-buttons'>
          {sessionUser &&
          <NavLink to="/spots/new" user={sessionUser} className='create-spot-link' >
            Create a New Spot
          </NavLink>}
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;