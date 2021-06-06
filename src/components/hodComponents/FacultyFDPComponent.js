import React,{useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
function FacultyFDPComponent(props){
    let [facultyFdpList,setFacultyFdpList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);

    const fetchFacultyFdpList=()=>{
        fetch("/api/fdp").then((res)=>res.json())
        .then((data)=>{
           setFacultyFdpList(data);     
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
        fetchFacultyFdpList(); 
        setFacultyFdpList([]);
        fetchFaculty();
   },[])
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Certifications and MOOCs</h5>
                <Table responsive>
                <thead>
                        <tr>
                                <th>S.No.</th>
                                <th>Faculty Name</th>
                                <th>Designation</th>
                                <th>FDP/Workshop Name</th>
                                <th>Organization</th>
                                <th>From</th>
                                <th>To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(facultyFdpList!=null)?
                                facultyFdpList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.fdpName}</td> 
                                    <td>{item.org}</td>
                                    <td>{new Date(item.from).toDateString()}</td>
                                    <td>{new Date(item.to).toDateString()}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
            </div>:''
        )
}
export default FacultyFDPComponent;