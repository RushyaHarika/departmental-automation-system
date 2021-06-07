import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


function PatentComponent(props){

    let [journalList,setJournalList]=useState([]);
    let [conferenceList,setConferenceList]=useState([]);
    let [facultyList,setFacultyList]=useState([]);
    const [facultyName,setFacultyName]=useState('');

    const [journal, setJournal] = useState(true);
    const [conference, setConference] = useState(false);

    const handle=(e)=>{
        e.preventDefault();
        setJournal(!journal);
        setConference(!conference);
    }

    const fetchJournalList=()=>{
        fetch("/api/journal/").then((res)=>res.json())
        .then((data)=>{
           setJournalList(data);     
        })
    }

    const fetchConferenceList=()=>{
        fetch("/api/conference/").then((res)=>res.json())
        .then((data)=>{
           setConferenceList(data);     
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
        fetchJournalList();
        fetchConferenceList();
        fetchFaculty(); 
   },[])
   
        return(
            
            props.display?
            <div className="container-fluid"><center>
            <h5  className="pt-5 pb-5">Journals/Conferences Published</h5> </center>
            <div>
                <Button variant='primary' type="button" id="journal" name="pub" onClick={handle}>
                {journal?"Switch to conference":"Switch to journal"} 
                </Button>
                <br/><br/>
            </div> 

           { journal?
                <React.Fragment>
                <center><h5>Journals</h5></center>
                <Table responsive>
                    
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name of the Faculty</th>
                            <th>Title of the paper</th>
                            <th>Author</th>
                            <th>Author Position</th>
                            <th>Name of the Journal</th>
                            <th>Impact</th>
                            <th>Volume Number</th>
                            <th>Issue Number</th>
                            <th>Page Number</th>
                            <th>Month and Year</th>
                            <th>Type of journal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(journalList!=null)?
                            journalList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.authPos}</td>
                                    <td>{item.nameOfJournal}</td>
                                    <td>{item.impact}</td>
                                    <td>{item.volume}</td>
                                    <td>{item.issue}</td>
                                    <td>{item.page}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.type}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    </tbody>
                </Table>
                </React.Fragment>

               :
                <React.Fragment>
                    <center><h5>Conferences</h5></center>
                <Table responsive>                    
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name of the Faculty</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Author Position</th>
                            <th>Name of the Conference</th>
                            <th>Impact</th>
                            <th>Volume Number</th>
                            <th>Issue Number</th>
                            <th>Page Number</th>
                            <th>Month and Year</th>
                            <th>Type of Conference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(conferenceList!=null)?
                            conferenceList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{facultyList.find(({ fid }) => fid === item.fid).name}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.authPos}</td>
                                    <td>{item.nameOfConference}</td>
                                    <td>{item.impact}</td>
                                    <td>{item.volume}</td>
                                    <td>{item.issue}</td>
                                    <td>{item.page}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.type}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    </tbody>
                </Table>
                </React.Fragment>                
                }

                

             
            </div>
            :''
        )
}
export default PatentComponent;