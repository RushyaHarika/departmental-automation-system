import React,{useState,useEffect} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SubjectAdditionModal from './SubjectAdditionModal';

function SubjectAllocationComponent(props){
    const [modalShow, setModalShow] = React.useState(false);
    let [facultyList,setFacultyList]=useState(null);
    let [subjectList,setSubjectList]=useState(null);
    let [subjectAllocationList,setSubjectAllocationList]=useState(null);

  const fetchFacultyList=()=>{
      fetch("/api/faculty").then((res)=>res.json())
      .then((data)=>{
         setFacultyList(data);
         console.log("Faculty list"+facultyList);
      }) 
      setModalShow(false);
  }

  const fetchSubjectList=()=>{
    fetch("/api/subject").then((res)=>res.json())
    .then((data)=>{
       setSubjectList(data);
       console.log("Subject list"+subjectList);
    }) 
    setModalShow(false);
 }

 const fetchSubjectAllocationList=()=>{
    fetch("http://localhost:5000/api/subjectAllocation").then((res)=>res.json())
    .then((data)=>{
       setSubjectAllocationList(data);
       console.log("Subject Allocation list"+subjectAllocationList);
    }) 
    setModalShow(false);
 }

 const removeAllocation=(courseCode)=>{
    fetch("/api/subjectAllocation/"+courseCode,{
        method: 'DELETE',  
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
    alert("Removed Successfully");
    fetchSubjectAllocationList();
}


  useEffect(() => {
       fetchFacultyList();
       fetchSubjectList();
       fetchSubjectAllocationList();   
  },[])

        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Subject Allocation</h5> 

                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course code</th>
                            <th>Course Name</th>
                            <th>Faculty ID</th>
                            <th>Faculty name</th>
                            <th>Remove Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(subjectAllocationList!=null)?
                            subjectAllocationList.map((item,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.courseCode}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.facultyID}</td>
                                    <td>{item.facultyName}</td>
                                    <td><Button variant="danger" onClick={()=>removeAllocation(`${item.courseCode}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):""
                        }
                   <tr>   
                        <td colSpan='5'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Allocate Subject</Button></td>
                    </tr>
                    </tbody>
                </Table>

                <SubjectAdditionModal
                    show={modalShow}
                    onHide={() => {
                        fetchFacultyList();
                        fetchSubjectList();
                        fetchSubjectAllocationList();
                    }} 
                    faculty={facultyList}
                    subjects={subjectList}
                />   
            </div>:''
        )
}
export default SubjectAllocationComponent;