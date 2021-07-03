import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import { param } from 'jquery';

function CertificationEditModal(props) {

    const params = useParams();
    const fid = params.id;
    const [courseName,setCourseName]=useState('');
    const [score,setScore]=useState('');
    const [issuedBy,setIssuedBy]=useState('');
    const [certificate,setCertificate]=useState('');
    const [topper,setTopper]=useState('');
    const [year,setYear]=useState('');
    const [monthFrom,setMonthFrom]=useState('');
    const [monthTo,setMonthTo]=useState('');

    
    const EditCertification =async (id)=>{
        console.log("AFTER EDIT ");
        console.log(props.editItem);
     const res=await fetch("/api/certification/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              courseName:(courseName?courseName:props.editItem.courseName), score:(score?score:props.editItem.score), issuedBy:(issuedBy?issuedBy:props.editItem.issuedBy), certificate:(certificate?certificate:props.editItem.certificate), topper:(topper?topper:props.editItem.topper), year:(year?year:props.editItem.year), monthFrom:(monthFrom?monthFrom:props.editItem.monthFrom), monthTo:(monthTo?monthTo:props.editItem.monthTo)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Certification updated successfully");
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
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.courseName} onChange={ e => {setCourseName(e.target.value)}}/>
              <label className='col-sm-4'>Score:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.score} onChange={ e => setScore(e.target.value)}/>
              <label className='col-sm-4'>Issued By:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.issuedBy} onChange={ e => setIssuedBy(e.target.value)}/>
              <label className='col-sm-4' >Certificate(Elite, Elite+silver,..):</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.certificate} onChange={ e => setCertificate(e.target.value)}/>
              <label className='col-sm-4' >Topper:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.topper} onChange={ e => setTopper(e.target.value)}/>
              <label className='col-sm-4' >Year:</label>
              <input className='col-sm-6' type='textbox' placeholder="yyyy" defaultValue={props.editItem.year} onChange={ e => setYear(e.target.value)}/>
              <label className='col-sm-4' >Cycle From:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.monthFrom} onChange={ e => setMonthFrom(e.target.value)}>
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
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.monthTo} onChange={ e => setMonthTo(e.target.value)}>
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
             </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditCertification(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default CertificationEditModal;