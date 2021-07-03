import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import FacultyAdditionModal from './FacultyAdditionModal';
import FacultyEditModal from './FacultyEditModal';

function FacultyDataComponent(props){
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editItem,setEditItem] = useState('');
    let [facultyList,setFacultyList]=useState(null);


    const removeFaculty=(fid)=>{
        fetch("/api/faculty/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully in faculty table");
        fetchFacultyList();

        fetch("/api/login/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully in login table");
    }

    const fetchFacultyList=()=>{
        fetch("/api/faculty").then((res)=>res.json())
        .then((data)=>{
           setFacultyList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
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
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Edit Faculty Details</th>
                            <th>Remove Faculty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(facultyList!=null)?
                            facultyList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.fid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.qualification}</td>
                                    <td>{item.email}</td>
                                    <td>{item.designation}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>{removeFaculty(`${item.fid}`)}}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='8'></td>
                        <td><Button variant="primary" onClick={() => {setModalShow(true);}}>Add Faculty</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <FacultyAdditionModal
        show={modalShow}
        onHide={()=>fetchFacultyList()}
      />

    <FacultyEditModal
        show={editModalShow}
        onHide={()=>fetchFacultyList()}
        editItem = {editItem}
      />    
                
            </div>:''
        )
}
export default FacultyDataComponent;
