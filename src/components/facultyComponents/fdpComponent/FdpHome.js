import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import FdpAdditionModal from './FdpAdditionModal';
import {useParams} from 'react-router-dom';

function FdpHomeComponent(props){

    const [modalShow, setModalShow] = useState(false);
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
    }

    useEffect(() => {
         fetchFdpList();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">FDP/Workshop attended</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>FDP/Workshop Name</th>
                            <th>Organized By</th>
                            <th>Venue</th>
                            <th>Resource Person</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(fdpList!=null)?
                            fdpList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.org}</td>
                                    <td>{item.venue}</td>
                                    <td>{item.resourcePerson}</td>
                                    <td>{item.from}</td>
                                    <td>{item.to}</td>
                                    <td><Button variant="danger" onClick={()=>removeFdp(`${item.fid}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='7'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add FDP</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <FdpAdditionModal
        show={modalShow}
        onHide={()=>fetchFdpList()}
      />
                
            </div>:''
        )
}
export default FdpHomeComponent;