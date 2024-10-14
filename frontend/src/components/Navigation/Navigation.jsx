// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
//   const dispatch = useDispatch();

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

  // const sessionLinks = sessionUser ? (
  //   <>
  //     <li>
  //       <ProfileButton user={sessionUser} />
  //     </li>
  //     {/* <li>
  //       <button onClick={logout}>Log Out</button>
  //     </li> */}
  //   </>
  // ) : (
  //   <>
  //     <li>
  //       {/* <NavLink to="/login">Log In</NavLink> */}
  //       <OpenModalButton
  //         buttonText="Log In"
  //         modalComponent={<LoginFormModal />}
  //       />
  //     </li>
  //     <li>
  //       {/* <NavLink to="/signup">Sign Up</NavLink> */}
  //       <OpenModalButton
  //         buttonText="Sign Up"
  //         modalComponent={<SignupFormModal />}
  //       />
  //     </li>
  //   </>
  // );

  return (
    <nav>
      <div className='header'>
        <div className='logo'>
          <NavLink to='/'>
            <img src='/favicon.ico' alt='Logo' />
          </NavLink>
        </div>
        <div className='auth-buttons'>
          <NavLink to="/">Home</NavLink>
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;