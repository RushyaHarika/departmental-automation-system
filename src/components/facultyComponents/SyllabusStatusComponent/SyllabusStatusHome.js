import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";

import SyllabusAdditionModal from './SyllabusAdditionModal';

function SyllabusStatusHome(props){
   
    const [modalShow, setModalShow] = useState(false);
    let [SyllabusList,setSyllabusList]=useState(null);
    const params=useParams();
    const fid=params.id; 
    
    const removeSyllabus=(id)=>{
        fetch("/api/syllabus/"+id,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchSyllabusList();
    }

    const fetchSyllabusList=()=>{
        fetch("/api/syllabus/"+fid).then((res)=>res.json())
        .then((data)=>{
           setSyllabusList(data); 
           console.log(data)    
        }) 
        setModalShow(false);
    }
    useEffect(() => {
         fetchSyllabusList(); 
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Syllabus Status</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject Name</th>
                            <th>Syllabus Covered as on date(No. of Units Covered)</th>
                            <th>Actual Syllabus to be Covered(As per lesson plan)</th>
                            <th>Topic last covered</th>
                            <th>No. of classes leading/lagging (+)/(-)</th>
                            <th>Remarks(Reasons for not covering in time as per lesson plan)</th>
                            <th>Date</th>
                            <th>Section</th>
                            <th>Year</th>
                            <th>Remove syllabus status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(SyllabusList!=null)?
                            SyllabusList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.sname}</td>
                                    <td>{item.syllabusCovered}</td>
                                    <td>{item.actualSyllabus}</td>
                                    <td>{item.topicCovered}</td>
                                    <td>{item.noc}</td>
                                    <td>{item.remarks}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.section}</td>
                                    <td>{item.year}</td>
                                    <td><Button variant="danger" onClick={()=>removeSyllabus(`${item._id}`)}>Remove</Button>{' '}</td>
                                
                                </tr>
                            )):<tr></tr>
                        }
                    
                    </tbody>
                   
                </Table>
                <Button style={{float:'right'}} variant="primary" onClick={() => setModalShow(true)}>Add Syllabus Status</Button>

                

      <SyllabusAdditionModal
        show={modalShow}
        onHide={()=>fetchSyllabusList()}
      />
                
            </div>:''
        )
}
export default SyllabusStatusHome;