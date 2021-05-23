import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


function SubjectAdditionModal(props) {

  const faculty = props.faculty;
  const subjects = props.subjects;

  let [courseCodeSelectList,setCourseCodeSelectList]=useState([]);
  let [facultyIDSelectList,setFacultyIDSelectList]=useState([]);
  let [facultySelectList,setFacultySelectList]=useState([]);
  let [subjectSelectList,setSubjectSelectList]=useState([]);

  const fetchCourseCodeSelectList=() => {
    subjects.map((item,index)=>(
        setCourseCodeSelectList((courseCodeSelectList) => [...courseCodeSelectList,item.courseCode])        
    ))
    console.log(courseCodeSelectList);
  }

  const fetchFacultyIDSelectList=() => {
    faculty.map((item,index)=>(
        setFacultyIDSelectList((facultyIDSelectList) => [...facultyIDSelectList,item.fid])        
    ))
    console.log(facultyIDSelectList);
  }

  const fetchFacultySelectList=() => {
    faculty.map((item,index)=>(
        setFacultySelectList((facultySelectList) => [...facultySelectList,item.name])        
    ))
    console.log(facultySelectList);
  }

  const fetchSubjectSelectList=() => {
      subjects.map((item,index)=>(
          setSubjectSelectList((subjectSelectList) => [...subjectSelectList,item.courseName])        
      ))
      console.log(subjectSelectList); 
  }


    useEffect(() => {
      setSubjectSelectList([]);
      setFacultySelectList([]);
      setCourseCodeSelectList([]);
      setFacultyIDSelectList([]);
      fetchFacultySelectList();
      fetchSubjectSelectList();
      fetchCourseCodeSelectList();
      fetchFacultyIDSelectList();   
 },[])

    const [facultyID,setFacultyID]=useState('');
    const [facultyName,setFacultyName]=useState('');
    const [courseCode,setCourseCode]=useState('');
    const [courseName,setCourseName]=useState('');
    
    const PostSubjectAllocation =async (e)=>{
      e.preventDefault();
      const res=await fetch("/api/subjectAllocation",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          facultyID,facultyName,courseCode,courseName
        })
      });
      const data=await res.json();
      console.log(data)
      if(res.status===422 || !data){
        window.alert("Invalid");
        console.log("Invalid")
      }else{
        window.alert("Successfull");
        setFacultyID('');
        setFacultyName('');
        setCourseCode('');
        setCourseName('');
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
                <select className="col-sm-4" name="subjectsID" value={courseCode} onChange={ e => setCourseCode(e.target.value)}>
                    <option>Select Course Code</option>
                    {(courseCodeSelectList!=null)?
                            courseCodeSelectList.map((item,index)=>(
                              <option>{item}</option>
                            )):""
                    }
                </select>
                <div className="col-sm-4"></div>
                <select className="col-sm-4" name="facultyID" value={facultyID} onChange={ e => setFacultyID(e.target.value)}>
                  <option>Select Faculty ID</option>
                    {(facultyIDSelectList!=null)?
                            facultyIDSelectList.map((item,index)=>(
                              <option>{item}</option>
                            )):""
                    } 
                </select>
                </div>

                <div className="row container-fluid p-3">
                <select className="col-sm-4" name="subjects" value={courseName} onChange={ e => setCourseName(e.target.value)}>
                    <option>Select Subject</option>
                    {(subjectSelectList!=null)?
                            subjectSelectList.map((item,index)=>(
                              <option>{item}</option>
                            )):""
                    }
                </select>
                <div className="col-sm-4"></div>
                <select className="col-sm-4" name="faculty" value={facultyName} onChange={ e => setFacultyName(e.target.value)}>
                  <option>Select Faculty</option>
                    {(facultySelectList!=null)?
                            facultySelectList.map((item,index)=>(
                              <option>{item}</option>
                            )):""
                    } 
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