import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import { param } from 'jquery';

function ConferenceEditModal(props) {

    const params = useParams();
    const fid = params.id;
    const [title,setTitle]=useState('');
    const [author,setAuthor]=useState('');
    const [authPos,setAuthPos]=useState('');
    const [nameOfConference,setNameOfConference]=useState('');
    const [impact,setImpact]=useState('');
    const [volume,setVolume]=useState('');
    const [issue,setIssue]=useState('');
    const [page,setPage]=useState('');
    const [date,setDate]=useState('');
    const [type,setType]=useState('');

    
    const EditConference =async (id)=>{
        const res=await fetch("/api/conference/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              title:(title?title:props.editItem.title), author:(author?author:props.editItem.author), authPos:(authPos?authPos:props.editItem.authPos), nameOfConference:(nameOfConference?nameOfConference:props.editItem.nameOfConference), impact:(impact?impact:props.editItem.impact), volume:(volume?volume:props.editItem.volume), issue:(issue?issue:props.editItem.issue), page:(page?page:props.editItem.page), date:(date?date:props.editItem.date), type:(type?type:props.editItem.type)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Conference updated successfully");
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
                 Conference Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Title:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.title} onChange={ e => {setTitle(e.target.value)}}/>
              <label className='col-sm-4'>Author:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.author} onChange={ e => setAuthor(e.target.value)}/>
              <label className='col-sm-4' >Author Position:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.authPos} onChange={ e => setAuthPos(e.target.value)}>
                <option>Select Type of Author</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <label className='col-sm-4'>Name Of the Conference:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.nameOfConference} onChange={ e => setNameOfConference(e.target.value)}/>
              <label className='col-sm-4'>Impact:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.impact} onChange={ e => setImpact(e.target.value)}/>
              <label className='col-sm-4'>Volume Number:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.volume} onChange={ e => setVolume(e.target.value)}/>
              <label className='col-sm-4'>Issue Number:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.issue} onChange={ e => setIssue(e.target.value)}/>
              <label className='col-sm-4'>Page Number:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.page} onChange={ e => setPage(e.target.value)}/>
              <label className='col-sm-4'>Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4' >Type Of Conference:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.type} onChange={ e => setType(e.target.value)}>
                <option>select</option>
                <option>UGC</option>
                <option>SCOPUS Indexed</option>
                <option>WOS</option>
                <option>ESCI</option>
              </select>
            </form>        
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditConference(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default ConferenceEditModal;