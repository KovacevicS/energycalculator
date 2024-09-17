import React, { useState } from 'react';
import './ElectricityCalculator.css';

// Define power consumption by energy class (in watts)
const energyData = {
  refrigerator: {
    'A++': 100,
    'A+': 150,
    'A': 200,
    'B': 250,
  },
  washingMachine: {
    'A++': 400,
    'A+': 500,
    'A': 600,
    'B': 800,
  },
  tv: {
    'A++': 80,
    'A+': 100,
    'A': 120,
    'B': 150,
  },
  stove: {
    'A++': 1800,
    'A+': 2000,
    'A': 2200,
    'B': 2500,
  },
  waterHeater: {
    'A++': 1200,
    'A+': 1500,
    'A': 1800,
    'B': 2200,
  },
  airConditioner: {
    'A++': 1800,
    'A+': 2000,
    'A': 2200,
    'B': 2500,
  },
  other: {
    'A++': 250,
    'A+': 300,
    'A': 350,
    'B': 400,
  },
};

// Add electricity price per kWh (in Serbian dinars, RSD)
const electricityPrice = 10.0; // Example: 10 RSD per kWh

const ElectricityCalculator = () => {
  const [hours, setHours] = useState({});
  const [selectedAppliances, setSelectedAppliances] = useState({});
  const [currentClass, setCurrentClass] = useState('A');
  const [newClass, setNewClass] = useState('A+');
  const [cost, setCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [paybackPeriod, setPaybackPeriod] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const handleChange = (e) => {
    setHours({ ...hours, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleApplianceChange = (e) => {
    const { name, checked } = e.target;
    setSelectedAppliances({ ...selectedAppliances, [name]: checked });
    if (!checked) {
      setHours({ ...hours, [name]: 0 }); // Reset hours if unchecked
    }
  };

  const handleClassChange = (e) => {
    if (e.target.name === 'current') {
      setCurrentClass(e.target.value);
    } else {
      setNewClass(e.target.value);
    }
  };

  const handlePriceChange = (e) => {
    setProductPrice(parseFloat(e.target.value) || 0);
  };

  const calculateCost = () => {
    let oldCost = 0;
    let newCost = 0;

    for (const [appliance, classes] of Object.entries(energyData)) {
      if (selectedAppliances[appliance]) {
        const oldPower = classes[currentClass] || 0;
        const newPower = classes[newClass] || 0;
        const usage = hours[appliance] || 0;

        const oldKWh = (oldPower / 1000) * usage;
        const newKWh = (newPower / 1000) * usage;

        oldCost += oldKWh;
        newCost += newKWh;
      }
    }

    const annualOldCost = oldCost * 365 * electricityPrice; // yearly cost in RSD
    const annualNewCost = newCost * 365 * electricityPrice; // yearly cost in RSD
    const annualSavings = annualOldCost - annualNewCost;

    setCost(annualOldCost);
    setSavings(annualSavings);

    const payback = productPrice / annualSavings;

    // Calculate payback period in years, months, and days
    const years = Math.floor(payback);
    const remainingMonths = (payback - years) * 12;
    const months = Math.floor(remainingMonths);
    const days = Math.round((remainingMonths - months) * 30);

    let paybackString = '';
    if (years > 0) {
      paybackString += `${years} godina `;
    }
    if (months > 0) {
      paybackString += `${months} meseci `;
    }
    paybackString += `${days} dana`;

    setPaybackPeriod(paybackString);
  };

  return (
    <div className="calculator-container">
      <h2>Electricity Cost Calculator</h2>
      <div className="form-group">
        <label htmlFor="productPrice">Price of New Product (RSD):</label>
        <input
          type="number"
          id="productPrice"
          value={productPrice}
          onChange={handlePriceChange}
          step="0.01"
        />
      </div>
      <div className="form-group">
        <label htmlFor="currentClass">Current Energy Class:</label>
        <select
          id="currentClass"
          name="current"
          value={currentClass}
          onChange={handleClassChange}
        >
          {Object.keys(energyData.refrigerator).map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="newClass">New Energy Class:</label>
        <select
          id="newClass"
          name="new"
          value={newClass}
          onChange={handleClassChange}
        >
          {Object.keys(energyData.refrigerator).map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>
      {Object.keys(energyData).map((appliance) => (
        <div key={appliance} className="form-group">
          <label>
            <input
              type="checkbox"
              name={appliance}
              checked={!!selectedAppliances[appliance]}
              onChange={handleApplianceChange}
            />
            {`${appliance.charAt(0).toUpperCase() + appliance.slice(1)}`}
          </label>
          {selectedAppliances[appliance] && (
            <div className="form-group">
              <label htmlFor={appliance}>{`${appliance.charAt(0).toUpperCase() + appliance.slice(1)} (hours per day):`}</label>
              <input
                type="number"
                id={appliance}
                name={appliance}
                value={hours[appliance] || ''}
                onChange={handleChange}
                step="0.1"
              />
            </div>
          )}
        </div>
      ))}
      <button onClick={calculateCost}>Calculate</button>
      <h3>Annual Cost with Current Equipment: {cost.toFixed(2)} RSD</h3>
      <h3>Annual Savings with New Equipment: {savings.toFixed(2)} RSD</h3>
      <h3>Payback Period: {paybackPeriod}</h3>
    </div>
  );
};

export default ElectricityCalculator;
