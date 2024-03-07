import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
       
        <Routes>
          
          <Route path="/" exact element={<Home />} />
        
        </Routes>
        <ScrollToTop />
     
      </BrowserRouter>
    </div>
  );
};

export default App;
