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
    const [year,setYear]=useState('');
    const [monthFrom,setMonthFrom]=useState('');
    const [monthTo,setMonthTo]=useState('');
    const params = useParams();
    const [pdf,setPDF]=useState("");
    
    const PostCertification =async ()=>{
      let formData = new FormData();
      formData.append('fid', fid);
      formData.append('courseName', courseName);
      formData.append('score', score);
      formData.append('issuedBy', issuedBy);
      formData.append('certificate', certificate);
      formData.append('topper', topper);
      formData.append('year', year);
      formData.append('cycle', monthFrom +'-'+ monthTo);
      formData.append('pdf', pdf);
      const res=await fetch("/api/certification",{
        method:"POST",
        body:formData
        
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
        setYear('');
        setMonthFrom('');
        setMonthTo('');
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
              <label className='col-sm-4' >Year:</label>
              <input className='col-sm-6' type='textbox' placeholder="yyyy" value={year} onChange={ e => setYear(e.target.value)}/>
              <label className='col-sm-4' >Cycle From:</label>
              <select className='col-sm-6' type='textbox' value={monthFrom} onChange={ e => setMonthFrom(e.target.value)}>
                <option>Select Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <label className='col-sm-4' >Cycle To:</label>
              <select className='col-sm-6' type='textbox' value={monthTo} onChange={ e => setMonthTo(e.target.value)}>
                <option>Select Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <label className='col-sm-4' >Upload Certificate:</label>
              <input className='col-sm-6' type='file' name='pdf' onChange={ e => setPDF(e.target.files[0])}/>

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