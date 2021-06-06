import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';

function CertificationsAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [courseName,setCourseName]=useState('');
    const [score,setScore]=useState('');
    const [issuedBy,setIssuedBy]=useState('');
    const [certificate,setCertificate]=useState('');
    const [topper,setTopper]=useState('');
    const params = useParams();
    

    const PostCertification =async ()=>{
      window.alert(fid);  
      const res=await fetch("/api/certification",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid, courseName, score, issuedBy, certificate, topper
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Certification added successfully");
        setCourseName('');
        setScore('');
        setIssuedBy('');
        setCertificate('');
        setTopper('');
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
            Certification Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Course/Certification Name:</label>
              <input className="col-sm-6" type='textbox' value={courseName} onChange={ e => {setCourseName(e.target.value); setFid(params.id)}}/>
              <label className='col-sm-4'>Score:</label>
              <input className='col-sm-6' type='textbox' value={score} onChange={ e => setScore(e.target.value)}/>
              <label className='col-sm-4'>Issued By:</label>
              <input className='col-sm-6' type='textbox' value={issuedBy} onChange={ e => setIssuedBy(e.target.value)}/>
              <label className='col-sm-4' >Certificate(Elite, Elite+silver,..):</label>
              <input className='col-sm-6' type='textbox' value={certificate} onChange={ e => setCertificate(e.target.value)}/>
              <label className='col-sm-4' >Topper:</label>
              <input className='col-sm-6' type='textbox' value={topper} onChange={ e => setTopper(e.target.value)}/>
             </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostCertification()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default CertificationsAdditionModal;