import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


function SubjectAdditionModal(props) {
  let [facultyList,setFacultyList]=useState([]);
  let [subjectList,setSubjectList]=useState([]);
  const [facultyID,setFacultyID]=useState('');
  const [courseCode,setCourseCode]=useState('');
  const [section,setSection]=useState('');

  const fetchSubjectList=()=>{
    fetch("/api/subject").then((res)=>res.json())
    .then((data)=>{
        data.map((item)=>(
            setSubjectList((subjectList) => [...subjectList,{"cname":item.courseName,"cid":item.courseCode}])     
         ))
    })
    console.log(subjectList) 
 }

 const fetchFacultyList=()=>{
    fetch("/api/faculty").then((res)=>res.json())
    .then((data)=>{
         data.map((item)=>(
            setFacultyList((facultyList) => [...facultyList,{"name":item.name,"fid":item.fid}])     
         ))
    })
    console.log(facultyList);
 }
    useEffect(() => {
      setSubjectList([]);
      setFacultyList([]);
      fetchSubjectList();
      fetchFacultyList();   
 },[])

    const PostSubjectAllocation =async ()=>{
      const res=await fetch("/api/subjectAllocation",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          facultyID,
          "facultyName":facultyList.find(({ fid }) => fid ===facultyID).name,
          courseCode,
          "courseName":subjectList.find(({ cid }) => cid ===courseCode).cname,
          section
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);
      }else{
        window.alert("Successfull");
        setFacultyID('');
        setCourseCode('');
        setSection('');
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
          <form>
              <div className="row container-fluid p-3">
                <select className="col-sm-4" value={courseCode} onChange={ e => setCourseCode(e.target.value)}>
                    <option>Select Course Code</option>
                    {(subjectList!=null)?
                            subjectList.map((item,index)=>(
                              <option>{item.cid}</option>
                            )):""
                    }
                </select>
               
                <select className="col-sm-4" name="facultyID" value={facultyID} onChange={ e => setFacultyID(e.target.value)}>
                  <option>Select Faculty ID</option>
                    {(facultyList!=null)?
                            facultyList.map((item,index)=>(
                              <option>{item.fid}</option>
                            )):""
                    } 
                </select>
                <select className="col-sm-4" value={section} onChange={ e => setSection(e.target.value)}>
                  <option>Select Section</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
                
                </div>               
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={PostSubjectAllocation}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default SubjectAdditionModal;