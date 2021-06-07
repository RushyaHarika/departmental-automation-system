import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';

function JournalAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [title,setTitle]=useState('');
    const [author,setAuthor]=useState('');
    const [authPos,setAuthPos]=useState('');
    const [nameOfJournal,setNameOfJournal]=useState('');
    const [impact,setImpact]=useState('');
    const [volume,setVolume]=useState('');
    const [issue,setIssue]=useState('');
    const [page,setPage]=useState('');
    const [date,setDate]=useState('');
    const [type,setType]=useState('');
    const params = useParams();
    

    const PostJournal =async ()=>{
      window.alert(fid);  
      const res=await fetch("/api/journal",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fid, title, author, authPos, nameOfJournal, impact, volume, issue, page, date, type
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Journal added successfully");
        setTitle('');
        setDate('');
        setAuthor('');
        setAuthPos('');
        setNameOfJournal('');
        setImpact('');
        setIssue('');
        setPage('');
        setType('');
        setVolume('');

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
            Journal Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Title:</label>
              <input className="col-sm-6" type='textbox' value={title} onChange={ e => {setTitle(e.target.value); setFid(params.id)}}/>
              <label className='col-sm-4'>Author:</label>
              <input className='col-sm-6' type='textbox' value={author} onChange={ e => setAuthor(e.target.value)}/>
              <label className='col-sm-4' >Author Position:</label>
              <select className='col-sm-6' type='textbox' value={authPos} onChange={ e => setAuthPos(e.target.value)}>
                <option>Select Author Position</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <label className='col-sm-4'>Name Of the Journal:</label>
              <input className='col-sm-6' type='textbox' value={nameOfJournal} onChange={ e => setNameOfJournal(e.target.value)}/>
              <label className='col-sm-4'>Impact:</label>
              <input className='col-sm-6' type='textbox' value={impact} onChange={ e => setImpact(e.target.value)}/>
              <label className='col-sm-4'>Volume Number:</label>
              <input className='col-sm-6' type='textbox' value={volume} onChange={ e => setVolume(e.target.value)}/>
              <label className='col-sm-4'>Issue Number:</label>
              <input className='col-sm-6' type='textbox' value={issue} onChange={ e => setIssue(e.target.value)}/>
              <label className='col-sm-4'>Page Number:</label>
              <input className='col-sm-6' type='textbox' value={page} onChange={ e => setPage(e.target.value)}/>
              <label className='col-sm-4'>Date:</label>
              <input className='col-sm-6' type='date' value={date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4' >Type Of Journal:</label>
              <select className='col-sm-6' type='textbox' value={type} onChange={ e => setType(e.target.value)}>
                <option>select</option>
                <option>UGC</option>
                <option>SCOPUS Indexed</option>
                <option>WOS</option>
                <option>ESCI</option>
              </select>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostJournal();}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default JournalAdditionModal;