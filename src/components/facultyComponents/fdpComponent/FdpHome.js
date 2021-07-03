import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import FdpAdditionModal from './FdpAdditionModal';
import FdpEditModal from './FdpEditModal';
import {useParams} from 'react-router-dom';

function FdpHomeComponent(props){

    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editItem,setEditItem] = useState('');
    let [fdpList,setFdpList]=useState(null);
    const params = useParams();
    const [fid,setFid] = useState('');
    
    
    const removeFdp=(fid)=>{
        fetch("/api/fdp/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchFdpList();
    }

    const fetchFdpList=()=>{
        fetch("/api/fdp/"+params.id).then((res)=>res.json()) //params.id => fid
        .then((data)=>{
           setFdpList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
    }

    useEffect(() => {
         fetchFdpList();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">FDP/Workshops/Seminars attended</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>FDP/Workshop Name</th>
                            <th>Organization</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Certification</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(fdpList!=null)?
                            fdpList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.fdpName}</td>
                                    <td>{item.org}</td>
                                    <td>{new Date(item.from).toDateString()}</td>
                                    <td>{new Date(item.to).toDateString()}</td>
                                    <td>{item.file_name}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeFdp(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='6'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add FDP</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <FdpAdditionModal
        show={modalShow}
        onHide={()=>fetchFdpList()}
      />

    <FdpEditModal
        show={editModalShow}
        onHide={()=>fetchFdpList()}
        editItem = {editItem}
      />                 
            </div>:''
        )
}
export default FdpHomeComponent;