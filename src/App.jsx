import React from 'react';
import MentorForm from './components/MentorForm';
import StudentForm from './components/StudentForm';
import AssignMentorToStudent from './components/AssignMentorToStudent';
import AssignStudentsToMentor from './components/AssignStudentToMentor';
import ShowStudentsForMentor from './components/ShowStudentsForMentor';
import ShowPreviousMentor from './components/ShowPreviousMentor';

function App() {
  return (
    <div className="App">
      <MentorForm />
      <StudentForm />
      <AssignStudentsToMentor />      
      <AssignMentorToStudent />
      <ShowStudentsForMentor />
      <ShowPreviousMentor /> 
    </div>
  );
}

export default App;
