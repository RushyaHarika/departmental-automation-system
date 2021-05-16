import React,{useEffect,useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../Style";
import SyllabusStatusComponent from './SyllabusStatusComponent';
import FacultyDataComponent from './facultyDataComponent/FacultyDataHome';
import FdpComponent from './FDPComponent';
import AwardComponent from './AwardComponent';
import PublishComponent from './PublishComponent';
import CertificationComponent from './CertificationComponent';
import IndustryTrainingComponent from './IndustryTrainingComponent';

function SideBarComponent(props){
    const [facultyData,setFacultyData]=useState(true);
    const [syllabus,setSyllabus]=useState(false);
    const [awards,setAwards]=useState(false);
    const [fdpAttended,setFdpAttended]=useState(false);
    const [publish,setPublish]=useState(false);
    const [certification,setCertification]=useState(false);
    const [training,setTraining]=useState(false);

    const handle=(e)=>{
        e.preventDefault();
        if(facultyData){
            setFacultyData(!facultyData);
        }if(syllabus){
            setSyllabus(!syllabus);
        }if(awards){
            setAwards(!awards);
        }if(fdpAttended){
            setFdpAttended(!fdpAttended);
        }if(publish){
            setPublish(!publish);
        }if(certification){
            setCertification(!certification);
        }if(training){
            setTraining(training);
        }
    }

    const handlefacultyData=(e)=>{
        handle(e);
        e.preventDefault();
        setFacultyData(true);
    }

    const handleSyllabus=(e)=>{
        handle(e);
        e.preventDefault();
        setSyllabus(true);
    }

    const handleFdpAttended=(e)=>{
        handle(e);
        e.preventDefault();
        setFdpAttended(true);
    }

    const handleAwards=(e)=>{
        handle(e);
        e.preventDefault();
        setAwards(true);
    }

    const handlePublish=(e)=>{
        handle(e);
        e.preventDefault();
        setPublish(true);
    }

    const handleCertification=(e)=>{
        handle(e);
        e.preventDefault();
        setCertification(true);
    }

    const handleTraining=(e)=>{
        handle(e);
        e.preventDefault();
        setTraining(true);
    }

    useEffect(() => {
        setFacultyData(true);
        setSyllabus(false);
        setAwards(false);
        setFdpAttended(false);
        setCertification(false);
    }, [])

    return(
        <HomeWrapper className="row">
            <div className="col-md-2">
                {props.display?
                    <ListGroupWrapper>
                        <ListGroup href="#" onClick={handlefacultyData}  className={ facultyData? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Faculty Data</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Subject Allocation</ListGroup>
                        <ListGroup href="#" onClick={handleSyllabus} className={ syllabus? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >Syllabus Status</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Lesson Plan</ListGroup>
                        <ListGroup href="#" onClick={handleFdpAttended} className={fdpAttended? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Workshop/FDP attended</ListGroup>
                        <ListGroup href="#" onClick={handlePublish} className={publish? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Paper published</ListGroup>
                        <ListGroup href="#" onClick={handleAwards} className={awards? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Awards/Achievements</ListGroup>
                        <ListGroup href="#" onClick={handleCertification} className={certification? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Mooc's/Certifications</ListGroup>
                        <ListGroup href="#" onClick={handleTraining} className={training? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Industry Training</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Result Analysis</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Feedback Report</ListGroup>
                    </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
               {facultyData? <FacultyDataComponent display={facultyData}/>:''}
               {syllabus? <SyllabusStatusComponent display={syllabus}/>:''}
               {fdpAttended? <FdpComponent display={fdpAttended}/>:''}
               {awards? <AwardComponent display={awards}/>:''}
               {publish? <PublishComponent display={publish}/>:''}
               {certification? <CertificationComponent display={certification}/>:''}
               {training? <IndustryTrainingComponent display={training}/>:''}
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;