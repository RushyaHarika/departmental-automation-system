import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import PatentAdditionModal from './PatentAdditionModal';
import {useParams} from 'react-router-dom';

function PatentHomeComponent(props){

    const [modalShow, setModalShow] = useState(false);
    let [patentList,setPatentList]=useState(null);
    const params = useParams();
    const [fid,setFid] = useState('');
    
    
    const removePatent=(fid)=>{
        fetch("/api/patent/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchPatentList();
    }

    const fetchPatentList=()=>{
        fetch("/api/patent/"+params.id).then((res)=>res.json()) //params.id => fid
        .then((data)=>{
           setPatentList(data);     
        }) 
        setModalShow(false);
    }

    useEffect(() => {
         fetchPatentList();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Patents/Copyrights Published/Granted</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Title of the patent</th>
                            <th>Application Number</th>
                            <th>Inventors</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(patentList!=null)?
                            patentList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.applicationNumber}</td>
                                    <td>{item.inventors}</td>
                                    <td>{item.date}</td>
                                    <td><Button variant="danger" onClick={()=>removePatent(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='5'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Patent</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <PatentAdditionModal
        show={modalShow}
        onHide={()=>fetchPatentList()}
      />
                
            </div>:''
        )
}
export default PatentHomeComponent;