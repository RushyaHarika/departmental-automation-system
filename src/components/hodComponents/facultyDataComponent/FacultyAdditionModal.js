import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function FacultyAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    const [qualification,setQualification]=useState('');
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("Welcome");

    const PostFaculty =async ()=>{
      
      const res=await fetch("/api/faculty",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid,name,mobile,qualification,email
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Faculty added successfully");
        setName('');
        setFid('');
        setMobile('');
        setQualification('');
        setEmail('');
      }      
    }

    const PostLogin =async ()=>{
      
      const res=await fetch("/api/login",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid,email,password
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Faculty added successfully");
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
              <label className='col-sm-4' >Email:</label>
              <input className='col-sm-6' type='textbox' value={email} onChange={ e => setEmail(e.target.value)}/><br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { PostLogin(); PostFaculty()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default FacultyAdditionModal;