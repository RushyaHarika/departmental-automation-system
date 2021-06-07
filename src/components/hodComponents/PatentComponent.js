import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';


function PatentComponent(props){
    let [patentList,setPatentList]=useState([]);
    let [facultyList,setFacultyList]=useState([]);
    const [facultyName,setFacultyName]=useState('');

    const fetchPatentList=()=>{
        fetch("/api/patent/").then((res)=>res.json())
        .then((data)=>{
           setPatentList(data);     
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
        fetchPatentList();
        fetchFaculty(); 
   },[])
   
        return(
            
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Patents/Copyrights Published/Granted</h5> 

                
                
                <Table responsive >
                   
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name of the Faculty</th>
                            <th>Title of the Patent</th>
                            <th>Application Number</th>
                            <th>Inventors</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {(patentList!=null)?
                            patentList.map((item,index)=>                                
                                (
                                <tr key={index}>       
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{item.title}</td>
                                    <td>{item.applicationNumber}</td>
                                    <td>{item.inventors}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                </tr>
                            )
                            ):<tr></tr>
                        }
                    </tbody>
                    
                </Table>
                
            </div>:''
        )
}
export default PatentComponent;