import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';


function GuestLecturesComponent(props){
    let [lectureList,setLectureList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);
    const [facultyName,setFacultyName]=useState('');

    const fetchLectureList=()=>{
        fetch("/api/lecture/").then((res)=>res.json())
        .then((data)=>{
           setLectureList(data);     
        })
    }

    const fetchFaculty=()=>{
        fetch("/api/faculty").then((res)=>res.json())
        .then((data)=>{
             console.log("data",data);
             data.map((item)=>(
                setFacultyList((facultyList) => [...facultyList,{"name":item.name,"fid":item.fid}])     
             ))
            console.log("facultyList",facultyList)
            
        })
}


    useEffect(() => {
        fetchLectureList(); 
        fetchFaculty();
       // setLectureList([]);
   },[])
   
        return(
            
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Guest Lectures Presented</h5> 

                
                
                <Table responsive >
                   
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Guest Lecturer Details</th>
                            <th>Date</th>
                            <th>Topic Name</th>
                            <th>Number of participants</th>
                            <th>College Details</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {(lectureList!=null)?
                            lectureList.map((item,index)=>                                
                                (
                                <tr key={index}>       
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.participants}</td>
                                    <td>{item.college}</td>
                                </tr>
                            )
                            ):<tr></tr>
                        }
                    </tbody>
                    
                </Table>
                
            </div>:''
        )
}
export default GuestLecturesComponent;