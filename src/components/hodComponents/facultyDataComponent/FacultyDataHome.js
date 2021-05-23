import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import FacultyAdditionModal from './FacultyAdditionModal';
window.list='';
function FacultyDataComponent(props){
    const [modalShow, setModalShow] = useState(false);
    let [facultyList,setFacultyList]=useState(null);
    const fetchFacultyList=()=>{
        fetch("/api/faculty").then((res)=>res.json())
        .then((data)=>{
           setFacultyList(data);
           
        }) 
        setModalShow(false);
    }
    useEffect(() => {
         fetchFacultyList();   
    },[])
    
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Faculty Data</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Faculty ID</th>
                            <th>Faculty Name</th>
                            <th>Mobile</th>
                            <th>Qualification</th>
                            <th>Edit details</th>
                            <th>Remove Faculty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(facultyList!=null)?
                            facultyList.map((item,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.eid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.qualification}</td>
                                    <td><Button variant="primary">Edit</Button>{' '}</td>
                                    <td><Button variant="danger">Remove</Button>{' '}</td>
                                </tr>
                            )):""
                        }
                    <tr>   
                        <td colSpan='6'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Faculty</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <FacultyAdditionModal
        show={modalShow}
        onHide={()=>fetchFacultyList()}
      />
                
            </div>:''
        )
}
export default FacultyDataComponent;