import React,{useEffect,useState} from 'react';
import download from 'downloadjs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function LessonPlanComponent(props){
    let [lessonPlanList,setLessonPlanList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);
    const [errorMsg,setErrorMsg]=useState('');

    const downloadFile = async (id, path,mimetype) => {
          const result = fetch('/api/lessonPlan/download/'+id, {
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

    const fetchLessonPlanList=()=>{
        fetch("/api/lessonPlan").then((res)=>res.json())
        .then((data)=>{
           setLessonPlanList(data);
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
        fetchLessonPlanList(); 
        setLessonPlanList([]);
        fetchFaculty();
   },[])
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Lesson Plan</h5>
                <Table responsive>
                <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Faculty Name</th>
                            <th>Course Name</th>
                            <th>Lesson Plan Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(lessonPlanList!=null)?
                                lessonPlanList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{item.courseName}</td>
                                    <td>{(item.file_path!==undefined)?<a href="#/" onClick={() =>downloadFile(item._id, item.file_path,item.file_mimetype)}>
                                    View Lesson Plan
                                    </a>:""}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
            </div>:''
        )
}
export default LessonPlanComponent;