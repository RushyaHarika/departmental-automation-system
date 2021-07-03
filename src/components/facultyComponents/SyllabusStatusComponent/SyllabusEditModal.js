import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";

function SyllabusEditModal(props) {

    const params=useParams();
    const facultyId=params.id; 
    const [sname,setSname]=useState('');
    const [syllabusCovered,setSyllabusCovered]=useState('');
    const [actualSyllabus,setActualSyllabus]=useState('');
    const [topicCovered,setTopicCovered]=useState('');
    const [noc,setNoc]=useState('');
    const [remarks,setRemarks]=useState('');
    const [date,setDate]=useState('');
    const [section,setSection]=useState('');
    const [year,setYear]=useState('');
    
    const EditSyllabus =async (id)=>{
        console.log("AFTER EDIT ");
        console.log(props.editItem);
        console.log(id);
        console.log(sname);
        console.log(syllabusCovered);
        console.log(actualSyllabus);
        console.log(topicCovered);
        console.log(noc);
        console.log(remarks);
        console.log(date);
        console.log(section);
        console.log(year);

        const res=await fetch("/api/syllabus/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              sname:(sname?sname:props.editItem.sname),syllabusCovered:(syllabusCovered?syllabusCovered:props.editItem.syllabusCovered),actualSyllabus:(actualSyllabus?actualSyllabus:props.editItem.actualSyllabus),topicCovered:(topicCovered?topicCovered:props.editItem.topicCovered), noc:(noc?noc:props.editItem.noc),remarks:(remarks?remarks:props.editItem.remarks),date:(date?date:props.editItem.date),section:(section?section:props.editItem.section),year:(year?year:props.editItem.year)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Syllabus status updated successfully");
          }

    }

    let [subjectSelectList,setSubjectSelectList]=useState([]);

    const fetchSubjectAllocationList=()=>{
      console.log(facultyId);
      fetch("/api/subjectAllocation/"+facultyId).then((res)=>res.json())
      .then((data)=>{
         data.map((item)=>(
          setSubjectSelectList((subjectSelectList) => [...subjectSelectList,item.courseName])     
         ))
         console.log("Subject Allocation list"+subjectSelectList);
      }) 
   }

   useEffect(() => {
    fetchSubjectAllocationList();
    setSubjectSelectList([]); 
  },[])

    return (
            <Modal
            {...props}
             size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             centered
           >
             <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
                 Syllabus Status Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Name of the Subject:</label>
              <select className="col-sm-6" name="subjects" defaultValue={props.editItem.sname} onChange={ e => setSname(e.target.value)}>
                    <option>Select Subject</option>
                    {(subjectSelectList!=null)?
                            subjectSelectList.map((item,index)=>(
                              <option>{item}</option>
                            )):""
                    }
              </select>   <br/>
              <label className='col-sm-4'>Syllabus Covered:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.syllabusCovered} onChange={ e => setSyllabusCovered(e.target.value)}/>
              <label className='col-sm-4'>Actual Syllabus to be Covered:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.actualSyllabus} onChange={ e => setActualSyllabus(e.target.value)}/>
              <label className='col-sm-4' >Topic last covered:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.topicCovered} onChange={ e => setTopicCovered(e.target.value)}/><br/>
              <label className='col-sm-4' >No. of Classes in leading/lagging:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.noc} onChange={ e => setNoc(e.target.value)}/><br/>
              <label className='col-sm-4' >Remarks:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.remarks} onChange={ e => setRemarks(e.target.value)}/><br/>
              <label className='col-sm-4' >Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.date} onChange={ e => setDate(e.target.value)}/><br/>
              <label className='col-sm-4' >Section:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.section} onChange={ e => setSection(e.target.value)}>
                <option>Select Section</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select><br/>
              <label className='col-sm-4' >Year:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.year} onChange={ e => setYear(e.target.value)}>
              <option>Select Year</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
              </select><br/>
          </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditSyllabus(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default SyllabusEditModal;