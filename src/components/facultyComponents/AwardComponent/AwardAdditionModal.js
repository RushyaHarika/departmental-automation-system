import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';

function AwardAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [title,setTitle]=useState('');
    const [date,setDate]=useState('');
    const [issuedBy,setIssuedBy]=useState('');
    const [description,setDescription]=useState('');
    const params = useParams();
    

    const PostAward =async ()=>{
      window.alert(fid);  
      const res=await fetch("/api/award",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid, title, date, issuedBy, description
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Achievement added successfully");
        setTitle('');
        setDate('');
        setIssuedBy('');
        setDescription('');
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
              <label className='col-sm-4'>Title:</label>
              <input className="col-sm-6" type='textbox' value={title} onChange={ e => {setTitle(e.target.value); setFid(params.id)}}/>
              <label className='col-sm-4'>Date:</label>
              <input className='col-sm-6' type='date' value={date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4'>Issued By:</label>
              <input className='col-sm-6' type='textbox' value={issuedBy} onChange={ e => setIssuedBy(e.target.value)}/>
              <label className='col-sm-4' >Description:</label>
              <input className='col-sm-6' type='textbox' value={description} onChange={ e => setDescription(e.target.value)}/>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostAward();}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default AwardAdditionModal;