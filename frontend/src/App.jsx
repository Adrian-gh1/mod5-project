// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormModal from './components/SignupFormModal';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      // {
      //   path: '/login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: "/signup",
      //   element: <SignupFormModal />
      // }
    ]
  }
]);

function App() {
  return (
    <div>
      <h1> Hello from App </h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
