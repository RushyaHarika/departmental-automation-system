import React,{ useState ,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";

function SyllabusAdditionModal(props) {
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
   
   
    const PostSyllabus =async (e)=>{
      console.log(facultyId);
      e.preventDefault();
      
      const res=await fetch("/api/syllabus",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          facultyId,sname,syllabusCovered,actualSyllabus,topicCovered,noc,remarks,date,section,year
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Syllabus status added successfully");
        setSname('');
        setSyllabusCovered('');
        setActualSyllabus('');
        setTopicCovered('');
        setNoc('');
        setRemarks('');
        setDate('');
        setYear('');
        setSection('');
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
            Faculty Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Name of the Subject:</label>
              <select className="col-sm-6" name="subjects" value={sname} onChange={ e => setSname(e.target.value)}>
                    <option>Select Subject</option>
                    {(subjectSelectList!=null)?
                            subjectSelectList.map((item,index)=>(
                              <option>{item}</option>
                            )):""
                    }
              </select>   <br/>
              <label className='col-sm-4'>Syllabus Covered:</label>
              <input className='col-sm-6' type='textbox' value={syllabusCovered} onChange={ e => setSyllabusCovered(e.target.value)}/>
              <label className='col-sm-4'>Actual Syllabus to be Covered:</label>
              <input className='col-sm-6' type='textbox' value={actualSyllabus} onChange={ e => setActualSyllabus(e.target.value)}/>
              <label className='col-sm-4' >Topic last covered:</label>
              <input className='col-sm-6' type='textbox' value={topicCovered} onChange={ e => setTopicCovered(e.target.value)}/><br/>
              <label className='col-sm-4' >No. of Classes in leading/lagging:</label>
              <input className='col-sm-6' type='textbox' value={noc} onChange={ e => setNoc(e.target.value)}/><br/>
              <label className='col-sm-4' >Remarks:</label>
              <input className='col-sm-6' type='textbox' value={remarks} onChange={ e => setRemarks(e.target.value)}/><br/>
              <label className='col-sm-4' >Date:</label>
              <input className='col-sm-6' type='date' value={date} onChange={ e => setDate(e.target.value)}/><br/>
              <label className='col-sm-4' >Section:</label>
              <select className='col-sm-6' type='textbox' value={section} onChange={ e => setSection(e.target.value)}>
                <option>Select Section</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select><br/>
              <label className='col-sm-4' >Year:</label>
              <select className='col-sm-6' type='textbox' value={year} onChange={ e => setYear(e.target.value)}>
              <option>Select Year</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
              </select><br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={PostSyllabus}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default SyllabusAdditionModal;