import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function FacultyEditModal(props) {

    const [fid,setFid]=useState(props.editItem.fid);
    const [name,setName]=useState(props.editItem.name);
    const [mobile,setMobile]=useState(props.editItem.mobile);
    const [qualification,setQualification]=useState(props.editItem.qualification);
    const [email,setEmail]=useState(props.editItem.email);
    const [designation,setDesignation]=useState(props.editItem.designation);
    
    const EditFaculty =async (fid)=>{
        console.log("AFTER EDIT ");
        console.log(props.editItem);
        console.log(fid);
        console.log(name);
        console.log(mobile);
        console.log(qualification);
        console.log(email);
        console.log(designation);

        const res=await fetch("/api/faculty/"+fid,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              name:(name?name:props.editItem.name),mobile:(mobile?mobile:props.editItem.mobile),qualification:(qualification?qualification:props.editItem.qualification),designation:(designation?designation:props.editItem.designation)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Faculty updated successfully");
            setName('');
            setMobile('');
            setQualification('');
            setDesignation('');

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
                 Faculty Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
          <label className='col-sm-4'>Employee ID:</label>
          <input className='col-sm-6' type='textbox' value={props.editItem.fid} />    
          <label className='col-sm-4'>Employee Name:</label>
          <input className='col-sm-6' type='textbox' defaultValue={props.editItem.name} onChange={ e => setName(e.target.value)}/>
          <label className='col-sm-4'>Mobile:</label>
          <input className='col-sm-6' type='textbox' defaultValue={props.editItem.mobile} onChange={ e => setMobile(e.target.value)}/>
          <label className='col-sm-4' >Qualification:</label>
          <input className='col-sm-6' type='textbox' defaultValue={props.editItem.qualification} onChange={ e => setQualification(e.target.value)}/><br/>
          <label className='col-sm-4' >Email:</label>
          <input className='col-sm-6' type='textbox' value={props.editItem.email} />
          <label className='col-sm-4' >Designation:</label>
          <select className='col-sm-6' type='textbox' defaultValue={props.editItem.designation} onChange={ e => setDesignation(e.target.value)}>
            <option>Select Designation</option>
            <option>Professor</option>
            <option>Assistant Professor</option>
          </select><br/>
      </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditFaculty(props.editItem.fid) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default FacultyEditModal;