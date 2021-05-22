import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function FacultyAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    const [qualification,setQualification]=useState('');
    const PostFaculty =async (e)=>{
      e.preventDefault();
      const res=await fetch("/api/faculty",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid,name,mobile,qualification
        })
      });
      const data=await res.json();
      console.log(data)
      if(res.status===422 || !data){
        window.alert("Invalid Registration");
        console.log("Invalid")
      }else{
        window.alert("Successfull");
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
            Faculty Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Employee ID:</label>
              <input className='col-sm-6' type='textbox' value={fid} onChange={ e => setFid(e.target.value)}/>    
              <label className='col-sm-4'>Employee Name:</label>
              <input className='col-sm-6' type='textbox' value={name} onChange={ e => setName(e.target.value)}/>
              <label className='col-sm-4'>Mobile:</label>
              <input className='col-sm-6' type='textbox' value={mobile} onChange={ e => setMobile(e.target.value)}/>
              <label className='col-sm-4' >Qualification:</label>
              <input className='col-sm-6' type='textbox' value={qualification} onChange={ e => setQualification(e.target.value)}/><br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={PostFaculty}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default FacultyAdditionModal;