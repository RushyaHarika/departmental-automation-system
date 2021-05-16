import React,{useEffect,useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../Style";
import SyllabusStatusComponent from './SyllabusStatusComponent';
import FacultyDataComponent from './FacultyDataComponent';

function SideBarComponent(props){
    const [facultyData,setFacultyData]=useState(true);
    const [syllabus,setSyllabus]=useState(false);
    const [awards,setAwards]=useState(false);
    const handle=(e)=>{
        e.preventDefault();
        setFacultyData(!facultyData);
        setSyllabus(!syllabus);
        setAwards(!awards);
    }

    useEffect(() => {
        setFacultyData(true);
        setSyllabus(false);
        setAwards(false);
    }, [])

    return(
        <HomeWrapper className="row">
            <div className="col-md-2">
                {props.display?
                    <ListGroupWrapper>
                        <ListGroup href="#" onClick={handle}  className={ facultyData? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Faculty Data</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Subject Allocation</ListGroup>
                        <ListGroup href="#" onClick={handle} className={ syllabus? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >Syllabus Status</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Lesson Plan</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Workshop/FDP attended</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Paper published</ListGroup>
                        <ListGroup href="#" onClick={handle} className={awards? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >Awards/Achievements</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Mooc's/Certifications</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Internship</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Result Analysis</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Feedback Report</ListGroup>
                    </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
               {facultyData? <FacultyDataComponent display={facultyData}/>:''}
               {syllabus? <SyllabusStatusComponent display={syllabus}/>:''}
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;