import React,{useEffect,useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


function GuestLecturesComponent(props){
    let [lectureList,setLectureList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);
    const [from,setFrom]=useState(null);
    const [to,setTo]=useState(null);

    const fetchLectureList=()=>{
        fetch("/api/lecture").then((res)=>res.json())
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

    const filterData=()=>{
        console.log("filter")
        fetch("/api/lecture/"+from+"/"+to)
        .then((res)=>res.json())
        .then((data)=>setLectureList(data))             
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
                
                <Table id="lecture" responsive >
                   
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
                <ReactHTMLTableToExcel 
                id="test-table-xls-button"
                className="download-table-xls-button btn-primary rounded p-1 float-right"
                table="lecture"
                filename="guestLectures"
                sheet="Guest_Lectures"
                buttonText="Download Table"/>
                
            </div>:''
        )
}
export default GuestLecturesComponent;