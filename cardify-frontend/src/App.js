import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

import React, { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
