import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Eneplus</h1>
      <p className="info-text">
        Discover how you can save energy and enhance efficiency in your daily life.
        Implementing energy-efficient practices not only helps in reducing your energy bills but also contributes to a healthier environment. Simple changes, like using energy-efficient appliances and insulating your home, can make a big difference.
      </p>
      <Link to="/users" className="button-link">
        Go to Users Page
      </Link>
    </div>
  );
};

export default Home;
