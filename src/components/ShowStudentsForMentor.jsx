import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentsForMentor = () => {
  const [mentorId, setMentorId] = useState('');
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/mentor');
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  }, []);

  const fetchStudentsForMentor = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/mentor/${mentorId}/students`);
      if (response.data.length === 0) {
        setMessage('No students found for this mentor');
        setStudents([]);
      } else {
        setMessage('');
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.response && error.response.status !== 404) {
        setMessage('Error fetching data');
      } else {
        setMessage('No students found for this mentor');
        setStudents([]);
      }
    }
  };

  const handleFetchStudents = async () => {
    if (!mentorId) {
      setMessage('Please select a mentor');
      setStudents([]);
      return;
    }
    await fetchStudentsForMentor();
  };

  return (
    <div>
      <h2>Students for Mentor</h2>
      <select value={mentorId} onChange={(e) => setMentorId(e.target.value)}>
        <option value="">Select Mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor._id} value={mentor._id}>
            {mentor.name}
          </option>
        ))}
      </select>&nbsp;&nbsp;
      <button onClick={handleFetchStudents}>Fetch Students</button>
      <h3>Students:</h3>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsForMentor;
