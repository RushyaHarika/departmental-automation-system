import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import SubjectEditModal from './SubjectEditModal';
import SubjectAdditionModal from './SubjectAdditionModal';

function SubjectDataComponent(props){
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editItem,setEditItem] = useState('');
    let [subjectList,setSubjectList]=useState(null);

    const fetchSubjectList=()=>{
        fetch("/api/subject").then((res)=>res.json())
        .then((data)=>{
           setSubjectList(data);
        })
        setModalShow(false);
        setEditModalShow(false);
    }

    

const removeSubject=(courseCode)=>{
    let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
    fetch("/api/subject/"+courseCode,{
        method: 'DELETE',  
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
    alert("Removed Successfully");
    fetchSubjectList();
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
                            <th>Edit Subject</th>
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
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeSubject(`${item.courseCode}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):""
                        }
                    <tr>   
                        <td colSpan='5'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Subject</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <SubjectAdditionModal
        show={modalShow}
        onHide={()=>fetchSubjectList()}
      />

<SubjectEditModal
        show={editModalShow}
        onHide={()=>fetchSubjectList()}
        editItem = {editItem}
      />
                
            </div>:''
        )
}
export default SubjectDataComponent;