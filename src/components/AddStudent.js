import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [student_name, setStudent_name] = useState("");
  const [student_email, setStudent_email] = useState("");
  const [student_status, setStudent_status] = useState("");
  const [status_code, setStatus_code] = useState(0);
 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setStudent_name(event.target.name);
    setStudent_email(event.target.email);
    setStudent_status(event.target.status);
    setStatus_code(event.target.status_code);
  }

// Save course and close modal form
  const handleAdd = () => {
      props.addStudent(student_name, student_email, status_code, student_status);
      handleClose();
  }

  return (
      <div>
        <Button id="addStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="StudentName" autoFocus fullWidth label="Student name" name="student_name" onChange={handleChange}  />
              <TextField id="StudentEmail" autoFocus fullWidth label="Student email" name="student_email" onChange={handleChange}  /> 
              <TextField id="StudentStatusCode" autoFocus fullWidth label="Student status_code" name="status_code" onChange={handleChange}  />  
              <TextField id="StudentStatus" autoFocus fullWidth label="Student status" name="student_status" onChange={handleChange}  /> 
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}


AddStudent.propTypes = {
  addStudent : PropTypes.func.isRequired
}

export default AddStudent;