import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreviousMentorForStudent = () => {
  const [studentId, setStudentId] = useState('');
  const [previousMentor, setPreviousMentor] = useState(null);
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('http://localhost:8000/student');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
    fetchStudents();
  }, []);

  const fetchPreviousMentor = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/student/${studentId}/previous-mentor`);
      if (response.data.previousMentor) {
        setPreviousMentor(response.data.previousMentor);
        setMessage('');
      } else {
        setMessage('No previous mentor found for this student');
        setPreviousMentor(null);
      }
    } catch (error) {
      setMessage('Error fetching data');
      setPreviousMentor(null);
    }
  };

  const handleFetchPreviousMentor = async () => {
    if (!studentId) {
      setMessage('Please select a student');
      setPreviousMentor(null);
      return;
    }
    await fetchPreviousMentor();
  };

  return (
    <div>
      <h2>Previous Mentor for Student</h2>
      <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>&nbsp;&nbsp;
      <button onClick={handleFetchPreviousMentor}>Fetch Previous Mentor</button>
      <h3>Previous Mentor:</h3>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {previousMentor && <p>{previousMentor.name}</p>}
    </div>
  );
};

export default PreviousMentorForStudent;
