import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';

function FdpAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [name,setName]=useState('');
    const [org,setOrg]=useState('');
    const [venue,setVenue]=useState('');
    const [resourcePerson,setResourcePerson]=useState('');
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');
    const [place,setPlace]=useState('');
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
          fid,name, org, venue, resourcePerson, from, to, place, designation
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("FDP added successfully");
        setName('');
        setOrg('');
        setVenue('');
        setResourcePerson('');
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
            FDP/Workshop Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>FDP/Workshop Name:</label>
              <input className="col-sm-6" type='textbox' value={name} onChange={ e => {setName(e.target.value); setFid(params.id)}}/>
              <label className='col-sm-4'>Organized By:</label>
              <input className='col-sm-6' type='textbox' value={org} onChange={ e => setOrg(e.target.value)}/>
              <label className='col-sm-4'>Venue:</label>
              <input className='col-sm-6' type='textbox' value={venue} onChange={ e => setVenue(e.target.value)}/>
              <label className='col-sm-4' >Resource Person:</label>
              <input className='col-sm-6' type='textbox' value={resourcePerson} onChange={ e => setResourcePerson(e.target.value)}/>
              <div>
              <label className='col-sm-2' >From:</label>
              <input className='col-sm-3' type='date' value={from} onChange={ e => setFrom(e.target.value)}/>
              <label className='col-sm-2' >To:</label>
              <input className='col-sm-3' type='date' value={to} onChange={ e => setTo(e.target.value)}/>
              </div>
              <div>
              <label className='col-sm-2' >Place:</label>
              <select className='col-sm-3' type='textbox' value={place} onChange={ e => setPlace(e.target.value)}>
                <option>Select Place</option>
                <option>In College</option>
                <option>Outside College</option>
              </select>
              <label className='col-sm-2' >Designation:</label>
              <select className='col-sm-3' type='textbox' value={designation} onChange={ e => setDesignation(e.target.value)}>
                <option>Select Designation</option>
                <option>Professor</option>
                <option>Assistant Professor</option>
              </select>
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