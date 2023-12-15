import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const AssignStudentsToMentor = () => {
  const [mentorId, setMentorId] = useState('');
  const [studentIds, setStudentIds] = useState([]);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch mentor
        const mentorsResponse = await axios.get('/mentor');
        setMentors(mentorsResponse.data);
  
        // Fetch unassigned student
        const unassignedStudentsResponse = await axios.get('/mentor/unassigned-students');
        setUnassignedStudents(unassignedStudentsResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleAssignStudents = async () => {
    try {
      if (!mentorId) {
        setError('Please select a mentor');
        return;
      }
      
      const response = await axios.post(`/mentor/${mentorId}/assign-students`, { studentIds });
      setMessage(response.data.message);
      setStudentIds([]);
      setError('');
    } catch (error) {
      setError('Error assigning students to mentor');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Assign Students to Mentor</h2>
      <select value={mentorId} onChange={(e) => setMentorId(e.target.value)}>
        <option value="">Select Mentor</option>
        {mentors.map(mentor => (
          <option key={mentor._id} value={mentor._id}>
            {mentor.name}
          </option>
        ))}
      </select>&nbsp;&nbsp;
      <h3>Unassigned Students:</h3>
      <ul>
        {unassignedStudents.map(student => (
          <li key={student._id}>
            <input
              type="checkbox"
              value={student._id}
              checked={studentIds.includes(student._id)}
              onChange={(e) => {
                const selectedIds = [...studentIds];
                if (e.target.checked) {
                  selectedIds.push(e.target.value);
                } else {
                  const index = selectedIds.indexOf(e.target.value);
                  if (index > -1) {
                    selectedIds.splice(index, 1);
                  }
                }
                setStudentIds(selectedIds);
              }}
            />
            {student.name}
          </li>
        ))}
      </ul>
      <button onClick={handleAssignStudents}>Assign Students</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AssignStudentsToMentor;
