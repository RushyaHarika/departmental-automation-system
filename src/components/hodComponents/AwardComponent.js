import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';

function AwardComponent(props){
    let [awardList,setAwardList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);

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
                <Table responsive>
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
            </div>:''
        )
}
export default AwardComponent;