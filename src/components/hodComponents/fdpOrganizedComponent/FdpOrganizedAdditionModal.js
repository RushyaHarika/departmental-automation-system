import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function FdpAdditionModal(props) {
    const [name,setName]=useState('');
    const [org,setOrg]=useState('');
    const [venue,setVenue]=useState('');
    const [resourcePerson,setResourcePerson]=useState('');
    const [date,setDate]=useState('');
    const [nop,setNop]=useState('');
    const [stuFac,setStuFac]=useState('');

    const PostFdp =async ()=>{ 
      const res=await fetch("/api/fdpOrganized",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          name, org, venue, resourcePerson, date, nop, stuFac
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
        setDate('');
        setNop('');
        setStuFac('');
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
              <input className="col-sm-6" type='textbox' value={name} onChange={ e => {setName(e.target.value)}}/>
              <label className='col-sm-4'>Organized By:</label>
              <input className='col-sm-6' type='textbox' value={org} onChange={ e => setOrg(e.target.value)}/>
              <label className='col-sm-4'>Venue:</label>
              <input className='col-sm-6' type='textbox' value={venue} onChange={ e => setVenue(e.target.value)}/>
              <label className='col-sm-4' >Resource Person:</label>
              <input className='col-sm-6' type='textbox' value={resourcePerson} onChange={ e => setResourcePerson(e.target.value)}/>
              <div>
              <label className='col-sm-4' >Date:</label>
              <input className='col-sm-6' type='date' value={date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4' >No. of Participants:</label>
              <input className='col-sm-6' type='textbox' value={nop} onChange={ e => setNop(e.target.value)}/>
              </div>
              <div>
              <label className='col-sm-4' >Student/Faculty:</label>
              <select className='col-sm-6' type='textbox' value={stuFac} onChange={ e => setStuFac(e.target.value)}>
                <option>Select</option>
                <option>Student</option>
                <option>Faculty</option>
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
