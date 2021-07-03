import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import { param } from 'jquery';

function PatentEditModal(props) {

    const params = useParams();
    const fid = params.id;
    const [title,setTitle]=useState('');
    const [applicationNumber,setApplicationNumber]=useState('');
    const [inventors,setInventors]=useState('');
    const [date,setDate]=useState('');
    const [status,setStatus]=useState('');

    
    const EditPatent =async (id)=>{
        console.log("AFTER EDIT ");

        const res=await fetch("/api/patent/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              title:(title?title:props.editItem.title), applicationNumber:(applicationNumber?applicationNumber:props.editItem.applicationNumber), inventors:(inventors?inventors:props.editItem.inventors), date:(date?date:props.editItem.date), status:(status?status:props.editItem.status)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Patent updated successfully");
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
                 Patent Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Title of the Patent:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.title} onChange={ e => {setTitle(e.target.value)}}/>
              <label className='col-sm-4'>Application Number:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.applicationNumber} onChange={ e => setApplicationNumber(e.target.value)}/>
              <label className='col-sm-4'>inventors:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.inventors} onChange={ e => setInventors(e.target.value)}/>
              <label className='col-sm-4' >Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4' ></label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.status} onChange={ e => setStatus(e.target.value)}>
                <option>Select status</option>
                <option>Published</option>
                <option>Granted</option>
              </select><br/>
            </form>             
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditPatent(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default PatentEditModal;