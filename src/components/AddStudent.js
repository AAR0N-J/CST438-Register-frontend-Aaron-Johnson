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
 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.name === 'student_name') { setStudent_name(event.target.value); }
    else if (event.target.name === 'student_email') { setStudent_email(event.target.value); }
    else if (event.target.name === 'student_status') { setStudent_status(event.target.value); }
  }

// Save course and close modal form
  const handleAdd = () => {
      props.addStudent(student_name, student_email, student_status);
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