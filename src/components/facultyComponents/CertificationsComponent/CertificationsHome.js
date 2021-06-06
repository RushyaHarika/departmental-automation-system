import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import CertificationsAdditionModal from './CertificationsAdditionModal';
import {useParams} from 'react-router-dom';

function CertificationsHomeComponent(props){

    const [modalShow, setModalShow] = useState(false);
    let [certificationList,setCertificationList]=useState(null);
    const params = useParams();
    const [fid,setFid] = useState('');
    
    
    const removeCertification=(fid)=>{
        fetch("/api/certification/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchCertificationList();
    }

    const fetchCertificationList=()=>{
        fetch("/api/certification/"+params.id).then((res)=>res.json()) //params.id => fid
        .then((data)=>{
           setCertificationList(data);     
        }) 
        setModalShow(false);
    }

    useEffect(() => {
         fetchCertificationList();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Certifications Completed</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Course Name</th>
                            <th>Score</th>
                            <th>Issued by</th>
                            <th>Certificate</th>
                            <th>Topper</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(certificationList!=null)?
                            certificationList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.score}</td>
                                    <td>{item.issuedBy}</td>
                                    <td>{item.certificate}</td>
                                    <td>{item.topper}</td>
                                    <td><Button variant="danger" onClick={()=>removeCertification(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='6'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Certification</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <CertificationsAdditionModal
        show={modalShow}
        onHide={()=>fetchCertificationList()}
      />
                
            </div>:''
        )
}
export default CertificationsHomeComponent;