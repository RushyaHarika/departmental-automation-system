import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import LessonPlanAdditionModal from './LessonPlanAdditionModal';
import {useParams} from 'react-router-dom';

function LessonPlanHomeComponent(props){

    const [modalShow, setModalShow] = useState(false);
    let [lessonPlanList,setLessonPlanList]=useState(null);
    const params = useParams();
    const [fid,setFid] = useState('');
    
    
    const removeLessonPlan=(fid)=>{
        fetch("/api/lessonPlan/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchLessonPlanList();
    }

    const fetchLessonPlanList=()=>{
        fetch("/api/lessonPlan/"+params.id).then((res)=>res.json()) //params.id => fid
        .then((data)=>{
           setLessonPlanList(data);     
        }) 
        setModalShow(false);
    }

    useEffect(() => {
         fetchLessonPlanList();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Lesson Plan Details</h5> 
                <Table responsive>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Subject Name</th>
                            <th>Lesson Plan Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(lessonPlanList!=null)?
                            lessonPlanList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.file_name}</td>
                                    <td><Button variant="danger" onClick={()=>removeLessonPlan(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                         <tr>   
                        <td colSpan='3'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Lesson Plan</Button></td>
                    </tr>
                    </tbody>
                </Table>
      <LessonPlanAdditionModal
        show={modalShow}
        onHide={()=>fetchLessonPlanList()}
      />
                
            </div>:''
        )
}
export default LessonPlanHomeComponent;