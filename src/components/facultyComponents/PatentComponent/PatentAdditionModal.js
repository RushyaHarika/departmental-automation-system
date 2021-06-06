import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';

function PatentAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [title,setTitle]=useState('');
    const [applicationNumber,setApplicationNumber]=useState('');
    const [inventors,setInventors]=useState('');
    const [date,setDate]=useState('');
    const params = useParams();
    

    const PostPatent =async ()=>{
      window.alert(fid);  
      const res=await fetch("/api/patent",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid, title, applicationNumber, inventors, date
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Patent added successfully");
        setTitle('');
        setApplicationNumber('');
        setInventors('');
        setDate('');
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
              <input className="col-sm-6" type='textbox' value={title} onChange={ e => {setTitle(e.target.value); setFid(params.id)}}/>
              <label className='col-sm-4'>Application Number:</label>
              <input className='col-sm-6' type='textbox' value={applicationNumber} onChange={ e => setApplicationNumber(e.target.value)}/>
              <label className='col-sm-4'>inventors:</label>
              <input className='col-sm-6' type='textbox' value={inventors} onChange={ e => setInventors(e.target.value)}/>
              <label className='col-sm-4' >Date:</label>
              <input className='col-sm-6' type='date' value={date} onChange={ e => setDate(e.target.value)}/>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostPatent()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default PatentAdditionModal;