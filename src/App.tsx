import React, { useState } from 'react';
import './App.css';

const PasswordValidator = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [message, setMessage] = useState('');

  const evaluatePassword = (pwd) => {
    setPassword(pwd);

    const strengthCriteria = [
      { regex: /.{8,}/, message: 'at least 8 characters', weight: 1 },
      { regex: /[A-Z]/, message: 'an uppercase letter', weight: 1 },
      { regex: /[a-z]/, message: 'a lowercase letter', weight: 1 },
      { regex: /\d/, message: 'a number', weight: 1 },
      { regex: /[\W_]/, message: 'a special character (e.g., !@#$)', weight: 1 },
    ];

    let strengthPoints = 0;
    const unmetCriteria = [];

    strengthCriteria.forEach((criteria) => {
      if (criteria.regex.test(pwd)) {
        strengthPoints += criteria.weight;
      } else {
        unmetCriteria.push(criteria.message);
      }
    });

    if (strengthPoints <= 2) {
      setStrength('Low');
    } else if (strengthPoints === 3) {
      setStrength('Medium');
    } else if (strengthPoints === 4) {
      setStrength('Strong');
    } else if (strengthPoints === 5) {
      setStrength('Too Strong');
    }

    setMessage(unmetCriteria.length
      ? `Your password needs: ${unmetCriteria.join(', ')}`
      : 'Perfect password!'
    );
  };

  return (
    <div className="container">
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => evaluatePassword(e.target.value)}
        className="password-input"
      />
      <div className={`strength ${strength.toLowerCase()}`}>
        <strong>Password Strength: {strength}</strong>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default PasswordValidator;
