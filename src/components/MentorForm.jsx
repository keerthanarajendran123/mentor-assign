import React, { useState } from 'react';
import axios from 'axios';

const MentorForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMentor = { name, email, course };
      const response = await axios.post('http://localhost:8000/mentor', newMentor);
      setSuccessMessage('Mentor created successfully!');
      setErrorMessage('');
      console.log(response.data);
    } catch (error) {
      setErrorMessage('Failed to create mentor.');
      setSuccessMessage(''); 
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />&nbsp;&nbsp;
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />&nbsp;&nbsp;
        <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />&nbsp;&nbsp;
        <button type="submit">Create Mentor</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default MentorForm;
