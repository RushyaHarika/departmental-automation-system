import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import GuestLectureAdditionModal from './GuestLectureAdditionModal';
import {useParams} from 'react-router-dom';

function GuestLectureHomeComponent(props){

    const [modalShow, setModalShow] = useState(false);
    let [lectureList,setLectureList]=useState(null);
    const params = useParams();
    const [fid,setFid] = useState('');
    
    
    const removeLecture=(fid)=>{
        fetch("/api/lecture/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchLectureList();
    }

    const fetchLectureList=()=>{
        fetch("/api/lecture/"+params.id).then((res)=>res.json()) //params.id => fid
        .then((data)=>{
           setLectureList(data);     
        }) 
        setModalShow(false);
    }

    useEffect(() => {
         fetchLectureList();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Guest Lectures Presented</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Topic Name</th>
                            <th>Date</th>
                            <th>Number of participants</th>
                            <th>College Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(lectureList!=null)?
                            lectureList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.date}</td>
                                    <td>{item.participants}</td>
                                    <td>{item.college}</td>
                                    <td><Button variant="danger" onClick={()=>removeLecture(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='5'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Guest Lecture</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <GuestLectureAdditionModal
        show={modalShow}
        onHide={()=>fetchLectureList()}
      />
                
            </div>:''
        )
}
export default GuestLectureHomeComponent;