import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import { param } from 'jquery';

function GuestLectureEditModal(props) {

    const params=useParams();
    const fid = params.id;
    const [topic,setTopic]=useState('');
    const [date,setDate]=useState('');
    const [participants,setParticipants]=useState('');
    const [college,setCollege]=useState('');
    
    const EditLecture =async (id)=>{
        console.log("AFTER EDIT ");
        console.log(props.editItem);
        console.log(id);
        console.log(topic);
        console.log(date);
        console.log(participants);
        console.log(college);

        const res=await fetch("/api/lecture/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              topic:(topic?topic:props.editItem.topic),date:(date?date:props.editItem.date),participants:(participants?participants:props.editItem.participants),college:(college?college:props.editItem.college)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Lecture data updated successfully");
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
                 Guest Lecture Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Lecture Topic:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.topic} onChange={ e => {setTopic(e.target.value)}}/>
              <label className='col-sm-4'>Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4'>Number of participants:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.participants} onChange={ e => setParticipants(e.target.value)}/>
              <label className='col-sm-4' >College Details:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.college} onChange={ e => setCollege(e.target.value)}/>
             </form>          
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditLecture(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default GuestLectureEditModal;