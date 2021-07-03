import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import AwardAdditionModal from './AwardAdditionModal';
import AwardEditModal from './AwardEditModal';

import {useParams} from 'react-router-dom';

function AwardHomeComponent(props){

    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editItem,setEditItem] = useState('');
    let [awardList,setAwardList]=useState(null);
    const params = useParams();
    const [fid,setFid] = useState('');
    
    
    const removeAward=(fid)=>{
        fetch("/api/award/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchAwardList();
    }

    const fetchAwardList=()=>{
        fetch("/api/award/"+params.id).then((res)=>res.json()) //params.id => fid
        .then((data)=>{
           setAwardList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
    }

    useEffect(() => {
         fetchAwardList();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Awards/Achievements</h5> 
                
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Given by</th>
                            <th>Description</th>
                            <th>Certificate</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(awardList!=null)?
                            awardList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.title}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.issuedBy}</td>
                                    <td>{item.description}</td>
                                    <td>{item.file_name}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeAward(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='7'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Achievement</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <AwardAdditionModal
        show={modalShow}
        onHide={()=>fetchAwardList()}
      />
      <AwardEditModal
        show={editModalShow}
        onHide={()=>fetchAwardList()}
        editItem = {editItem}
      />       
            </div>:''
        )
}
export default AwardHomeComponent;