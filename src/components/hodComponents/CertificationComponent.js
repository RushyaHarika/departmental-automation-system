import React,{useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
function CertificationComponent(props){
    let [CertificationList,setCertificationsList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);

    const fetchCertificationsList=()=>{
        fetch("/api/certification").then((res)=>res.json())
        .then((data)=>{
           setCertificationsList(data);     
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
        fetchCertificationsList(); 
        setCertificationsList([]);
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
                                <th>Course Name</th>
                                <th>Faculty Name</th>
                                <th>Score</th>
                                <th>Issued by</th>
                                <th>Certificate</th>
                            <th>Topper</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(CertificationList!=null)?
                                CertificationList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.courseName}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{item.score}</td>
                                    <td>{item.issuedBy}</td>
                                    <td>{item.certificate}</td>
                                    <td>{item.topper}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
            </div>:''
        )
}
export default CertificationComponent;