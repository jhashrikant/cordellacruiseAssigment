import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Cruise from './components/Cruise/Cruise';
//https://staging.cordeliacruises.com/api/v2/itineraries?pagination=false&#39;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
      <Cruise />
    </BrowserRouter>
  );
}

export default App;
