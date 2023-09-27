import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import {SERVER_URL} from '../constants';

const AdminHome = ()  => {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState(' ');

    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


    const fetchStudents = () => {
        console.log("fetchStudnets");
        fetch(`${SERVER_URL}/student`)
        .then((response) => { return response.json(); } )
        .then((data) => { setStudents(data); })
        .catch((err) =>  { 
            console.log("exception fetchStudnets"+err);
            setMessage("Exception. "+err);
         } );
    }

    /*
     * add student
     */
    const  addStudent = (student_name, student_email, statusCode, student_status) => {
      setMessage('');
      console.log("start addStudent"); 
      fetch(`${SERVER_URL}/student/${{name: student_name, email: student_email, status_code: statusCode, status: student_status}}`,
      { 
          method: 'POST', 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name: student_name, email: student_email, status_code: statusCode, status: student_status})
      })
      .then(res => {
          if (res.ok) {
          console.log("addStudent ok");
          setMessage("Student added.");
          fetchStudents();
          } else {
          console.log('error addStudent ' + res.status);
          setMessage("Error. "+res.status);
          }})
      .catch(err => {
          console.error("exception addStudent "+ err);
          setMessage("Exception. "+err);
      })
  }

  /* 
   *   edit student
   */ 
  const editStudent = (student_id, student_name, student_email, statusCode, student_status) => {
    setMessage('');
    fetch(`${SERVER_URL}/student/${student_id}`, 
    {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: student_name, email: student_email, status_code: statusCode, status: student_status})
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Student updated.');
          fetchStudents();
        } else {
          console.error('error updateStudent ' + res.status);
          setMessage('Error. ' + res.status);
        }
      })
      .catch((err) => {
        console.error('exception updateStudent ' + err);
        setMessage('Exception. ' + err.message);
      });
    }
      /* 
   *   drop course
   */ 
    const deleteStudent = (event) => {
      setMessage('');
      const row_id = event.target.parentNode.parentNode.rowIndex - 1;
      console.log("drop student "+row_id);
      const student_id = students[row_id].id;
      
      if (window.confirm('Are you sure you want to drop the student?')) {
          fetch(`${SERVER_URL}/student/${student_id}`,
          {
              method: 'DELETE',
          }
          )
      .then(res => {
          if (res.ok) {
              console.log("drop ok");
              setMessage("Student dropped.");
              fetchStudents();
          } else {
              console.log("drop error");
              setMessage("Error dropStudent. "+res.status);
          }
          })
      .catch( (err) => {
          console.log("exception dropStudent "+err);
          setMessage("Exception. "+err);
       } );
      }
  }

    const headers = ['Student ID', 'Name', 'Email', 'Status Code', 'Status', ' '];

    if (students.length === 0) {
      return (
          <div>
              <h3>No Enrolled Students</h3>
              <h4>{message}</h4>
              <AddStudent addStudent={addStudent} />
          </div>
          );
    } else { 
      return(
          <div margin="auto" >
              <h3>Enrolled students</h3>
              <h4>{message}</h4>
              <table className="Center"> 
                  <thead>
                  <tr>
                      {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                  </tr>
                  </thead>
                  <tbody>
                  {students.map((row,idx) => (
                          <tr key={idx}>
                          <td>{row.student_id}</td>
                          <td>{row.name}</td>
                          <td>{row.email}</td>
                          <td>{row.status_code}</td>
                          <td>{row.status}</td>
                          <td><EditStudent student={row} editStudent={editStudent}/></td>
                          <td><button type="button" margin="auto" onClick={deleteStudent(row.student_id)}>Delete</button></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <AddStudent addStudent={addStudent} />
          </div>
      );
   }
}

export default AdminHome;