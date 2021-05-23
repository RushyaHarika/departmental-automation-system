import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import SubjectAdditionModal from './SubjectAdditionModal';
window.list='';
function SubjectDataComponent(props){
    const [modalShow, setModalShow] = useState(false);
    let [subjectList,setSubjectList]=useState(null);

    const fetchSubjectList=()=>{
        fetch("/api/subject").then((res)=>res.json())
        .then((data)=>{
           setSubjectList(data);
        })
        setModalShow(false);
    }
    useEffect(() => {
         fetchSubjectList();   
    },[])
    
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Subject Data</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Semester</th>
                            <th>Remove Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(subjectList!=null)?
                            subjectList.map((item,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.courseCode}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.semester}</td>
                                    <td><Button variant="danger">Remove</Button>{' '}</td>
                                </tr>
                            )):""
                        }
                    <tr>   
                        <td colSpan='4'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Subject</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <SubjectAdditionModal
        show={modalShow}
        onHide={()=>fetchSubjectList()}
      />
                
            </div>:''
        )
}
export default SubjectDataComponent;