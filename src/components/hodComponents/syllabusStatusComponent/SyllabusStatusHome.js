import React,{useEffect,useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



function SyllabusStatusHome(props){
    let [SyllabusList,setSyllabusList]=useState(null);
    let [syllabusSubjectList,setSyllabusSubjectList]=useState([]);
    let [facultyList,setFacultyList]=useState([]);
    const [subject,setSubject]=useState(null);
    const [date,setDate]=useState(null);
    const [section,setSection]=useState(null);
    const [year,setYear]=useState(null);


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


    const fetchSubjectList=()=>{
        fetch("/api/subject").then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            data.map((item)=>(
                setSyllabusSubjectList((syllabusSubjectList) => [...syllabusSubjectList,item.courseName])     
            ))
        })
    }

    const fetchSyllabusList=()=>{
        fetch("/api/syllabus/").then((res)=>res.json())
        .then((data)=>{
           setSyllabusList(data);     
        }) 
    }
    const filterData=()=>{
        fetch("/api/syllabus/"+date+"/"+subject+"/"+section+"/"+year)
        .then((res)=>res.json())
        .then((data)=>setSyllabusList(data))             
    }
    useEffect(() => {
         fetchSyllabusList(); 
         setSyllabusList([]);
         fetchSubjectList();
         fetchFaculty();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Syllabus Status</h5> 
            <div className="row pb-3 pt-3">
                <select className="col-sm-2 p-1" name="subjects" value={subject} onChange={ e => setSubject(e.target.value)}>
                    <option >Select Subject</option>
                    {(syllabusSubjectList!=null)?
                            syllabusSubjectList.map((item,index)=>(
                              <option value={item}>{item}</option>
                            )):""
                    }
                </select>
                <div className="col-sm-1"></div>
                    <input className="col-sm-2 p-1" type="date" value={date} onChange={ e => setDate(e.target.value)}></input>
                    <div className="col-sm-1"></div>
                <select className="col-sm-2 p-1" value={section} onChange={ e => setSection(e.target.value)}>
                    <option>Select section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </select>
                <div className="col-sm-1"></div>
               
                    <select className="col-sm-2 p-1" value={year} onChange={ e => setYear(e.target.value)}>
                        <option>Select year</option>
                        <option>I</option>
                        <option>II</option>
                        <option>III</option>
                        <option>IV</option>
                    </select>
                    <div className="pr-1"></div>
                    <Button variant="primary" onClick={filterData}>Filter</Button>
                
                
                    
                </div>
                
                
                <Table id="syllabusStatus" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Faculty Name</th>
                            <th>Subject Name</th>
                            <th>Syllabus Covered as on date(No. of Units Covered)</th>
                            <th>Actual Syllabus to be Covered(As per lesson plan)</th>
                            <th>Topic last covered</th>
                            <th>No. of classes leading/lagging (+)/(-)</th>
                            <th>Remarks(Reasons for not covering in time as per lesson plan)</th>
                            <th>Section</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {(SyllabusList!=null)?
                            SyllabusList.map((item,index)=>(
                                <tr key={index}>       
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.facultyId).name}</td>
                                    <td>{item.sname}</td>
                                    <td>{item.actualSyllabus}</td>
                                    <td>{item.topicCovered}</td>
                                    <td>{item.noc}</td>
                                    <td>{item.remarks}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.section}</td>
                                    <td>{item.year}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    </tbody>
                    
                </Table>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn-primary rounded p-1 float-right"
                    table="syllabusStatus"
                    filename="syllabus-status"
                    sheet="tablexls"
                    buttonText="Download syllabus status"/>
                
            </div>:''
        )
}
export default SyllabusStatusHome;