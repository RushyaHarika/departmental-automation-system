import React,{useEffect,useState} from 'react';
import download from 'downloadjs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function FacultyFDPComponent(props){
    let [facultyFdpList,setFacultyFdpList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);
    const [from,setFrom]=useState(null);
    const [to,setTo]=useState(null);
    const [errorMsg,setErrorMsg]=useState('');

    const downloadFile = async (id, path,mimetype) => {
        const result = fetch('/api/fdp/download/'+id, {
          responseType: 'blob'
        })
        .then((res)=>res.blob())
        .then((data)=>{
          console.log("result",result.data);
          const split = path.split('/');
          const filename = split[split.length - 1];
          console.log(filename);
          setErrorMsg('');
          return download(data,filename,mimetype); 
        })
    };

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
                setFacultyList((facultyList) => [...facultyList,{"name":item.name,"fid":item.fid,"designation":item.designation}])     
             ))
            console.log("facultyList",facultyList)
            
        })
    }

    const filterData=()=>{
        console.log("filter")
        fetch("/api/fdp/"+from+"/"+to)
        .then((res)=>res.json())
        .then((data)=>setFacultyFdpList(data))             
    }


    useEffect(() => {
        fetchFacultyFdpList(); 
        setFacultyFdpList([]);
        fetchFaculty();
   },[])
        return(
            props.display?
                <div className="container-fluid">
                    <h5  className="pt-5 pb-5">Workshop/FDP Attended</h5>
                    <div className="row pb-3 pt-3">
                    <div className="col-sm-1"></div>
                    <label className=" pt-1 pr-2 pl-5">From:</label>
                    <input className="col-sm-2" type="date" value={from} onChange={ e => setFrom(e.target.value)}></input>
                    <div className="col-sm-1"></div>
                    <label className="pt-1 pr-2 pl-5">To:</label>
                    <input className="col-sm-2" type="date" value={to} onChange={ e => setTo(e.target.value)}></input>
                    <div className="col-sm-2"></div>
                    <Button variant="primary" onClick={filterData}>Filter</Button>               
                </div>
                <Table responsive>
                <thead>
                        <tr>
                                <th>S.No.</th>
                                <th>Faculty Name</th>
                                <th>Designation</th>
                                <th>FDP/Workshop Name</th>
                                <th>Organization</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>View Certificate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(facultyFdpList!=null)?
                                facultyFdpList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).designation}</td>
                                    <td>{item.fdpName}</td> 
                                    <td>{item.org}</td>
                                    <td>{new Date(item.from).toDateString()}</td>
                                    <td>{new Date(item.to).toDateString()}</td>
                                    <td>{(item.file_path!==undefined)?<a href="#/" onClick={() =>downloadFile(item._id, item.file_path,item.file_mimetype)}>
                                    Download Certificate
                                    </a>:""}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <Table id="fdp" responsive style={{display:'none'}}>
                <thead>
                        <tr>
                                <th>S.No.</th>
                                <th>Faculty Name</th>
                                <th>Designation</th>
                                <th>FDP/Workshop Name</th>
                                <th>Organization</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(facultyFdpList!=null)?
                                facultyFdpList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).designation}</td>
                                    <td>{item.fdpName}</td> 
                                    <td>{item.org}</td>
                                    <td>{new Date(item.from).toDateString()}</td>
                                    <td>{new Date(item.to).toDateString()}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <ReactHTMLTableToExcel 
                id="test-table-xls-button"
                className="download-table-xls-button btn-primary rounded p-1 float-right"
                table="fdp"
                filename="FdpAttended"
                sheet="FDP Attended"
                buttonText="Download Certifications Table"/>
            </div>:''
        )
}
export default FacultyFDPComponent;