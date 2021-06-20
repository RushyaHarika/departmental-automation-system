import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';

function GuestLectureAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [topic,setTopic]=useState('');
    const [date,setDate]=useState('');
    const [participants,setParticipants]=useState('');
    const [college,setCollege]=useState('');
    const params = useParams();
    

    const PostLecture =async ()=>{ 
      const res=await fetch("/api/lecture",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid, topic, date, participants, college
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("FDP added successfully");
        setTopic('');
        setDate('');
        setParticipants('');
        setCollege('');
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
              <input className="col-sm-6" type='textbox' value={topic} onChange={ e => {setTopic(e.target.value); setFid(params.id)}}/>
              <label className='col-sm-4'>Date:</label>
              <input className='col-sm-6' type='date' value={date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4'>Number of participants:</label>
              <input className='col-sm-6' type='textbox' value={participants} onChange={ e => setParticipants(e.target.value)}/>
              <label className='col-sm-4' >College Details:</label>
              <input className='col-sm-6' type='textbox' value={college} onChange={ e => setCollege(e.target.value)}/>
             </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostLecture()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default GuestLectureAdditionModal;