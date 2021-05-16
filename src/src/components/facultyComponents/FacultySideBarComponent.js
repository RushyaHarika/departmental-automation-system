import React,{useEffect,useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../Style";
import FdpAttendedComponent from './FdpAttendedComponent';
function SideBarComponent(props){
    const [syllabus,setSyllabus]=useState(false);
    const [awards,setAwards]=useState(false);
    const [fdpAttended,setFdpAttended]=useState(true);
    const handle=(e)=>{
        e.preventDefault();
        setSyllabus(!syllabus);
        setAwards(!awards);
        setFdpAttended(!fdpAttended);
    }

    useEffect(() => {
        setSyllabus(true);
        setAwards(false);
        setFdpAttended(false);
    }, [])

    return(
        <HomeWrapper className="row">
            <div className="col-md-2">
                {props.display?
                    <ListGroupWrapper>
                        <ListGroup href="/" className="list-group-item list-group-item-action">Lesson Plan</ListGroup>
                        <ListGroup href="#" onClick={handle} className={ syllabus? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >Syllabus Status</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">FDP/Conference Request</ListGroup>
                        <ListGroup href="#" onClick={handle} className={ fdpAttended?'list-group-item list-group-item-action active':'list-group-item list-group-item-action'}>FDP/Conference attended</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Paper published</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Moocs/Certifications completed</ListGroup>
                        <ListGroup href="#" onClick={handle} className={awards? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >Industry Training/Internship Completed</ListGroup>
                     </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
                
                {fdpAttended? <FdpAttendedComponent display={fdpAttended}/>:''}
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;