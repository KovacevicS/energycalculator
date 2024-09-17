import React, { useState } from 'react';
import './Users.css';
import { Link } from 'react-router-dom';

const Users = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ovde možete dodati logiku za slanje podataka ili bilo šta drugo
    console.log('Submitted:', { email, firstName, lastName });
  };

  return (
    <div className="users-container">
      <h2>Enter User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <Link to="/calculator" className="navigate-link">
        Go to Calculator
      </Link>
    </div>
  );
};

export default Users;
