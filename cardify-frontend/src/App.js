import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

import React, { useState, useEffect } from 'react';

import axios from 'axios';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //
  useEffect(() => {
    // Check if the user is authenticated by making a request to the backend
    axios.get('http://localhost:8888/checkAuth', { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  }, []);


  console.log(isAuthenticated);
  
  return (
    <div className="App">

        <Navbar />

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
