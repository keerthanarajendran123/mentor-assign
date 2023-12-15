import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStudent = { name, batch };
      const response = await axios.post('http://localhost:8000/student', newStudent);
      setSuccessMessage('Student created successfully!');
      setErrorMessage('');
      console.log(response.data);
    } catch (error) {
      console.error('Error', error.message);
      setErrorMessage('Failed to create student');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />&nbsp;&nbsp;
        <input type="text" placeholder="Batch" value={batch} onChange={(e) => setBatch(e.target.value)} />&nbsp;&nbsp;
        <button type="submit">Create Student</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default StudentForm;
