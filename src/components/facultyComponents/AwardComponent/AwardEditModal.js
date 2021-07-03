import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import { param } from 'jquery';

function AwardEditModal(props) {

    const params = useParams();
    const fid = params.id;
    const [title,setTitle]=useState('');
    const [date,setDate]=useState('');
    const [issuedBy,setIssuedBy]=useState('');
    const [description,setDescription]=useState('');

    
    const EditAward =async (id)=>{
        console.log("AFTER EDIT ");
        console.log(props.editItem);
     const res=await fetch("/api/award/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              title:(title?title:props.editItem.title), date:(date?date:props.editItem.date), issuedBy:(issuedBy?issuedBy:props.editItem.issuedBy), description:(description?description:props.editItem.description)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Award updated successfully");
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
                 Award Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Title:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.title} onChange={ e => {setTitle(e.target.value)}}/>
              <label className='col-sm-4'>Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4'>Issued By:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.issuedBy} onChange={ e => setIssuedBy(e.target.value)}/>
              <label className='col-sm-4' >Description:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.description} onChange={ e => setDescription(e.target.value)}/>
            </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditAward(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default AwardEditModal;