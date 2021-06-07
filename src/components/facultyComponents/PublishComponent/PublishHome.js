import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import JournalAdditionModal from './JournalAdditionModal';
import ConferenceAdditionModal from './conferenceAdditionModal';
import {useParams} from 'react-router-dom';

function PublishHomeComponent(props){

    const [journal, setJournal] = useState(true);
    const [conference,setConference]=useState(false);

    const [modalShow, setModalShow] = useState(false);
    let [journalList,setJournalList]=useState(null);
    let [conferenceList,setConferenceList]=useState(null);
    const params = useParams();
    const [fid,setFid] = useState('');

    const handle=(e)=>{
        e.preventDefault();
        setJournal(!journal);
        setConference(!conference);
    }
    
    
    const removeJournal=(fid)=>{
        fetch("/api/journal/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchJournalList();
    }

    const fetchJournalList=()=>{
        fetch("/api/journal/"+params.id).then((res)=>res.json()) //params.id => fid
        .then((data)=>{
           setJournalList(data);     
        }) 
        setModalShow(false);
    }

    const removeConference=(fid)=>{
        fetch("/api/conference/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchConferenceList();
    }

    const fetchConferenceList=()=>{
        fetch("/api/conference/"+params.id).then((res)=>res.json()) //params.id => fid
        .then((data)=>{
           setConferenceList(data);     
        }) 
        setModalShow(false);
    }

    useEffect(() => {
         fetchJournalList();
         fetchConferenceList();
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
                                    <td><Button variant="danger" onClick={()=>removeJournal(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='11'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Journal</Button></td>
                    </tr>
                    </tbody>
                </Table>
                <JournalAdditionModal
                    show={modalShow}
                    onHide={()=>fetchJournalList()}
                />
                </React.Fragment>

               :
                <React.Fragment>
                    <center><h5>Conferences</h5></center>
                <Table responsive>                    
                    <thead>
                        <tr>
                            <th>S.No.</th>
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
                                    <td><Button variant="danger" onClick={()=>removeConference(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='11'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Conference</Button></td>
                    </tr>
                    </tbody>
                </Table>
                <ConferenceAdditionModal
                    show={modalShow}
                    onHide={()=>fetchConferenceList()}
                />
                </React.Fragment>                
                }

                

             
            </div>
            :''
        )
}
export default PublishHomeComponent;