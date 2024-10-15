// frontend/src/components/SignupFormPage/SignupFormPage.jsx

import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
// import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log('Data 1:', data);
        if (data?.errors) {
          console.log('Data 2:', data.errors);
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const disableSignUpButton = 
    // Disable Button when any field is empty
    email.length === 0 ||
    username.length === 0 ||
    firstName.length === 0 ||
    lastName.length === 0 ||
    password.length === 0 ||
    confirmPassword.length === 0 ||
    
    // Disable button when not enough characters
    username.length < 4 ||
    password.length < 6
    ;


  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='signup-errors'>{errors.email}</p>}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='signup-errors'>{errors.username}</p>}

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='signup-errors'>{errors.firstName}</p>}

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='signup-errors'>{errors.lastName}</p>}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='signup-errors'>{errors.password}</p>}

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className='signup-errors'>{errors.confirmPassword}</p>}

        <button type="submit" disabled={disableSignUpButton}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;