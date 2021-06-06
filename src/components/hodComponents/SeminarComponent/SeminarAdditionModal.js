import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function SeminarAdditionModal(props) {
    const [topic,setTopic]=useState('');
    const [resourcePerson,setResourcePerson]=useState('');
    const [venue,setVenue]=useState('');
    const [date,setDate]=useState('');
    const [participants,setParticipants]=useState('');
    const [who,setWho]=useState('');

    const PostSeminar =async ()=>{
      
      const res=await fetch("/api/seminar",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          topic,resourcePerson,venue,date,participants,who
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Added successfully");
        setTopic('');
        setResourcePerson('');
        setVenue('');
        setDate('');
        setParticipants('');
        setWho('');
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
            Seminar/Guest Lecture details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Topic:</label>
              <input className='col-sm-6' type='textbox' value={topic} onChange={ e => setTopic(e.target.value)}/>    
              <label className='col-sm-4'>Resource Person:</label>
              <input className='col-sm-6' type='textbox' value={resourcePerson} onChange={ e => setResourcePerson(e.target.value)}/>
              <label className='col-sm-4'>Venue:</label>
              <input className='col-sm-6' type='textbox' value={venue} onChange={ e => setVenue(e.target.value)}/>
              <label className='col-sm-4' >Date:</label>
              <input className='col-sm-6' type='date' value={date} onChange={ e => setDate(e.target.value)}/><br/>
              <label className='col-sm-4' >Participants:</label>
              <input className='col-sm-6' type='textbox' value={participants} onChange={ e => setParticipants(e.target.value)}/><br/>
              <label className='col-sm-4' >Faculty/Student:</label>
              <select className='col-sm-6' type='textbox' value={who} onChange={ e => setWho(e.target.value)}>
                <option>Select</option>
                <option>Faculty</option>
                <option>Student</option>
              </select>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { PostSeminar()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default SeminarAdditionModal;