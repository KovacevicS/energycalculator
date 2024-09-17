import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Users from './Users/Users';
import ElectricityCalculator from './Kalkulator/ElectricityCalculator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/calculator" element={<ElectricityCalculator/>}/>
      </Routes>
    </Router>
  );
};

export default App;
