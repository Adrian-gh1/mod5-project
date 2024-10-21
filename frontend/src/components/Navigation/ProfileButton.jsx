// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton';
import { NavLink, useNavigate  } from 'react-router-dom';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
// import ManageSpotsPage from '../ManageSpotsPage/ManageSpotsPage';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate(`/`);
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className='login-menu'>
              
              <div className='subsection1'>
                <div>
                  Hello, {user.firstName}
                </div>
                <div>
                  {user.email}
                </div>
              </div>

              <div className='subsection2'>
                <NavLink to='/spots/current' onClick={closeMenu} className='manage-spots-link'>
                  Manage Spots
                </NavLink>
              </div>

              <div className='subsection3'>
                <button onClick={logout}>Log Out</button>
              </div>

            </div>
          </>
        ) : (
          <>
            <div className='auth-links'>
              <OpenModalMenuItem
                // buttonText="Sign Up"
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <OpenModalMenuItem
                // buttonText="Log In"
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;