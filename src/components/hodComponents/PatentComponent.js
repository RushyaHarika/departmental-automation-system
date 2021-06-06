import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';


function PatentComponent(props){
    let [patentList,setPatentList]=useState([]);
    let [facultyNameList,setFacultyNameList]=useState([]);
    const [facultyName,setFacultyName]=useState('');

    const fetchPatentList=()=>{
        fetch("/api/patent/").then((res)=>res.json())
        .then((data)=>{
           setPatentList(data);     
        })
    }

    const fetchFaculty=(fid)=>{
        fetch("/api/faculty/"+fid).then((res)=>res.json())
        .then((data)=>{
             setFacultyName(data.name);    
        })
        console.log(facultyName)
      return facultyName;
}

  
    

    useEffect(() => {
        fetchPatentList(); 
   },[])
   
        return(
            
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Patents/Copyrights Published/Granted</h5> 

                
                
                <Table responsive >
                   
                    <thead>
                        <tr>
                            <th>#</th>
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