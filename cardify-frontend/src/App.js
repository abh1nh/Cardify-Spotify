import Navbar from './Navbar';
import Home from './Home';
import HomePage from './HomePage';


function App() {
  return (
    <div className="App">
      <Navbar />

      
      <div className='content'>
        <Home />
      </div>

      <div className='homePage'>

      </div>
        <HomePage />  
      </div>
  );
}

export default App;
