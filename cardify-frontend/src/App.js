import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

const localURL = process.env.REACT_APP_LOCAL_URL;
const piURL = process.env.REACT_APP_PI_URL;

console.log(piURL);
console.log(localURL);

function App() {

  
  


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //
  useEffect(() => {
    // Check if the user is authenticated by making a request to the backend
    axios.get(piURL+'checkAuth', { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  }, []);

  const handleLogout = () => {
    // Make a request to the backend to log the user out
    axios.post(piURL+'logout', {}, { withCredentials: true })
      .then(() => {
        // On success, clear the frontend state and redirect the user to the login page
        setIsAuthenticated(false);
        window.location.href = '/';  // Redirect to the login page
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };
  
  return (
    <div className="App">

      <Navbar handleLogout={handleLogout}/>

      <div className='content'>

        {!isAuthenticated ? (
          <div className='loginpage'>
            <LoginPage setIsAuthenticated={setIsAuthenticated} />
          </div>

        ) : (
          <div className='homepage'>
            <HomePage />
          </div>
        )}

      </div>

    </div>
  );
}

export default App;
