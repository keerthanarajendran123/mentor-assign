import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const AssignMentorToStudent = () => {
  const [studentId, setStudentId] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch student
        const studentsResponse = await axios.get('/student');
        setStudents(studentsResponse.data);

        // Fetch mentor
        const mentorsResponse = await axios.get('/mentor');
        setMentors(mentorsResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleAssignMentor = async () => {
    try {
      if (!studentId || !mentorId) {
        setError('Please select both student and mentor');
        return;
      }

      const response = await axios.post(`/student/${studentId}/assign-mentor/${mentorId}`);
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError('Error assigning mentor to student');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Assign Mentor to Student</h2>
      <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
        <option value="">Select Student</option>
        {students.map(student => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>&nbsp;&nbsp;
      <select value={mentorId} onChange={(e) => setMentorId(e.target.value)}>
        <option value="">Select Mentor</option>
        {mentors.map(mentor => (
          <option key={mentor._id} value={mentor._id}>
            {mentor.name}
          </option>
        ))}
      </select>&nbsp;&nbsp;
      <button onClick={handleAssignMentor}>Assign Mentor</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AssignMentorToStudent;
