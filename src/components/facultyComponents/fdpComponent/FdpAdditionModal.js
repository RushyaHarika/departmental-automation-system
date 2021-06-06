import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';

function FdpAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [fdpName,setFdpName]=useState('');
    const [org,setOrg]=useState('');;
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');
    const [designation,setDesignation]=useState('');
    const params = useParams();
    

    const PostFdp =async ()=>{
      window.alert(fid);  
      const res=await fetch("/api/fdp",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid,fdpName, org, designation, from, to
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("FDP added successfully");
        setFdpName('');
        setOrg('');
        setDesignation('');
        setFrom('');
        setTo('');
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
            FDP/Workshop/Seminar Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>FDP/Workshop Name:</label>
              <input className="col-sm-6" type='textbox' value={fdpName} onChange={ e => {setFdpName(e.target.value); setFid(params.id)}}/>
              <label className='col-sm-4'>Organization:</label>
              <input className='col-sm-6' type='textbox' value={org} onChange={ e => setOrg(e.target.value)}/>
              <label className='col-sm-4' >Designation:</label>
              <select className='col-sm-6' type='textbox' value={designation} onChange={ e => setDesignation(e.target.value)}>
                <option>Select Designation</option>
                <option>Professor</option>
                <option>Assistant Professor</option>
              </select>
             <div>
              <label className='col-sm-2' >From:</label>
              <input className='col-sm-3' type='date' value={from} onChange={ e => setFrom(e.target.value)}/>
              <label className='col-sm-2' >To:</label>
              <input className='col-sm-3' type='date' value={to} onChange={ e => setTo(e.target.value)}/>
              </div>              
             </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostFdp()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default FdpAdditionModal;