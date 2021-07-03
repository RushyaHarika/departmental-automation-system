import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import { param } from 'jquery';

function FdpEditModal(props) {

    const params = useParams();
    const fid = params.id;
    const [fdpName,setFdpName]=useState('');
    const [org,setOrg]=useState('');;
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');
    
    const EditFdp =async (id)=>{
        console.log("AFTER EDIT ");
        console.log(props.editItem);
        console.log(id);
        console.log(fdpName);
        console.log(org);
        console.log(from);
        console.log(to);


      /* let formData = new FormData();
        formData.append('fdpName', fdpName?fdpName:props.editItem.fdpName);
        formData.append('org', org?org:props.editItem.org);
        formData.append('from', from?from:props.editItem.from);
        formData.append('to', to?to:props.editItem.to);
        formData.append('pdf', (pdf)?pdf:props.editItem.pdf);
*/
        const res=await fetch("/api/fdp/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              fdpName:(fdpName?fdpName:props.editItem.fdpName), org:(org?org:props.editItem.org), from:(from?from:props.editItem.from), to:(to?to:props.editItem.to)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Fdp updated successfully");
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
                 FDP Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>FDP/Workshop Name:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.fdpName} onChange={ e => {setFdpName(e.target.value)}}/>
              <label className='col-sm-4'>Organization:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.org} onChange={ e => setOrg(e.target.value)}/>
             <div>
              <label className='col-sm-2' >From:</label>
              <input className='col-sm-3' type='date' defaultValue={props.editItem.from} onChange={ e => setFrom(e.target.value)}/>
              <label className='col-sm-2' >To:</label>
              <input className='col-sm-3' type='date' defaultValue={props.editItem.to} onChange={ e => setTo(e.target.value)}/> 
            </div>              
             </form>         
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditFdp(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default FdpEditModal;