// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
// import { Navigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal()

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          // setErrors(data.message);
          setErrors({credential: 'The provided credentials were invalid'});
        }
      });
  };

  const handleDemoLogIn = () => {
    return dispatch(sessionActions.login({
      credential: 'demo@user.io',
      password: 'password'
    }))
      .then(closeModal)
  };

  const disableLogInButton = credential.length < 4 || password.length < 6;

  return (
    <>
      <div className='login-modal-container'>
        <h1 className='login-title'>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {errors.credential && <p className='login-errors'>{errors.credential}</p>}
          <button type="submit" disabled={disableLogInButton} className='login-button'>
            Log In
          </button>

        </form>
        
        <button onClick={handleDemoLogIn} className='login-button'>
          Log in as Demo User
        </button>

      </div>
    </>
  );
}

export default LoginFormModal;