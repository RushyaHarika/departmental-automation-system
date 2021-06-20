import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import download from 'downloadjs';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function AwardComponent(props){
    let [awardList,setAwardList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);
    const [from,setFrom]=useState(null);
    const [to,setTo]=useState(null);
    const [errorMsg,setErrorMsg]=useState('');

    const downloadFile = async (id, path,mimetype) => {
        const result = fetch('/api/award/download/'+id, {
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

    const filterData=()=>{
        console.log("filter")
        fetch("/api/award/"+from+"/"+to)
        .then((res)=>res.json())
        .then((data)=>setAwardList(data))             
    }

    const fetchAwardList=()=>{
        fetch("/api/award").then((res)=>res.json())
        .then((data)=>{
           setAwardList(data);     
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
        fetchAwardList(); 
        setAwardList([]);
        fetchFaculty();
   },[])
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Awards/Achievements</h5>

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
                                <th>Title</th>
                                <th>Date</th>
                                <th>Issued by</th>
                                <th>Description</th>
                                <th>Certificate Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(awardList!=null)?
                                awardList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{item.title}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.issuedBy}</td>
                                    <td>{item.description}</td>
                                    <td><a href="#/" onClick={() =>downloadFile(item._id, item.file_path,item.file_mimetype)}
                    >
                      Download Certificate
                    </a></td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <Table id="awards" style={{display:'none'}}>
                <thead>
                        <tr>
                            <th>S.No.</th>
                                <th>Faculty Name</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Issued by</th>
                                <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(awardList!=null)?
                                awardList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{item.title}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.issuedBy}</td>
                                    <td>{item.description}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <ReactHTMLTableToExcel 
            id="test-table-xls-button"
            className="download-table-xls-button btn-primary rounded p-1 float-right"
            table="awards"
            filename="awards"
            sheet="tablexls"
            buttonText="Download Awards Table"/>
            </div>:''
        )
}
export default AwardComponent;