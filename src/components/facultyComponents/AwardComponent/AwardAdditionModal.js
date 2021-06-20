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
    const [pdf,setPDF]=useState("");
  

    const PostAward =async ()=>{
      let formData = new FormData();
      formData.append('fid', fid);
      formData.append('title', title);
      formData.append('date', date);
      formData.append('issuedBy', issuedBy);
      formData.append('description', description);
      formData.append('pdf', pdf);
      const res=await fetch("/api/award",{
        method:"POST",
        body:formData
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
            Awards/Achievements
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
              <label className='col-sm-4' >Upload Certificate:</label>
              <input className='col-sm-6' type='file' name='pdf' onChange={ e => setPDF(e.target.files[0])}/>
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