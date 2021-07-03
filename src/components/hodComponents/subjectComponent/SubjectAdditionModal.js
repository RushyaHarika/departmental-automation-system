import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {Required} from '../../../Style';

function SubjectAdditionModal(props) {
    const [courseCode,setCourseCode]=useState('');
    const [courseName,setCourseName]=useState('');
    const [semester,setSemester]=useState('');

    const PostSubject =async (e)=>{
      e.preventDefault();
      const res=await fetch("/api/subject",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          courseCode,courseName,semester
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);
      }else{
        window.alert("Subject Added Successfully");
        setCourseCode('');
        setCourseName('');
        setSemester('');
      }
    }
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Subject Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Course Code:<Required>*</Required></label>
              <input className='col-sm-6' type='textbox' value={courseCode} onChange={ e => setCourseCode(e.target.value)}/>    
              <label className='col-sm-4'>Course Name:</label>
              <input className='col-sm-6' type='textbox' value={courseName} onChange={ e => setCourseName(e.target.value)}/>
              <label className='col-sm-4'>Semester:</label>
              <input className='col-sm-6' type='textbox' value={semester} onChange={ e => setSemester(e.target.value)}/><br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={PostSubject}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default SubjectAdditionModal;