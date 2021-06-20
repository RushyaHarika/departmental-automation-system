import React,{useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../Style";
import SyllabusStatusComponent from './syllabusStatusComponent/SyllabusStatusHome';
import SubjectDataComponent from './subjectComponent/SubjectDataHome';
import FacultyDataComponent from './facultyDataComponent/FacultyDataHome';
import FdpComponent from './fdpOrganizedComponent/FdpOrganizedHome';
import AwardComponent from './AwardComponent';
import PublishComponent from './PublishComponent';
import CertificationComponent from './CertificationComponent';
import IndustryTrainingComponent from './IndustryTrainingComponent';
import SubjectAllocationComponent from './subjectAllocationComponent/SubjectAllocationHome';
import FacultyFdpComponent from './FacultyFDPComponent';
import GuestLecturesComponent from './GuestLectureComponent';
import PatentComponent from './PatentComponent';
import SeminarComponent from './SeminarComponenr/SeminarHome';
import LessonPlanComponent from './LessonPlanComponent';


function SideBarComponent(props){
    const initialList=[
        {
            id:1,
            display:true
        },{
            id:2,
            display:false
        },{
            id:3,
            display:false
        },{
            id:4,
            display:false
        },{
            id:5,
            display:false
        },{
            id:6,
            display:false
        },{
            id:7,
            display:false
        },{
            id:8,
            display:false
        },{
            id:9,
            display:false
        },{
            id:10,
            display:false
        },{
            id:11,
            display:false
        },{
            id:12,
            display:false
        },{
            id:13,
            display:false
        },{
            id:14,
            display:false
        }
    ]
    const [list,setList]=useState(initialList);
    
    const handle=(e,id)=>{
        e.preventDefault();
        console.log("enetered");
        const newList = list.map((item) => {
            if (item.id === id) {
              const updatedItem = {
                ...item,
                display: true,
              };
              return updatedItem;
            }else{
                const updatedItem = {
                    ...item,
                    display: false,
                }; 
                return updatedItem;
            }
        });
        setList(newList);
    }
    
    return(
        <HomeWrapper className="row">
            <div className="col-md-2">
                {props.display?
                    <ListGroupWrapper>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[0].id)}  className={ list[0].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Faculty Data</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[1].id)}  className={ list[1].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Subject Data</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[2].id)}  className={ list[2].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Subject Allocation</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[3].id)} className={ list[3].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >Syllabus Status</ListGroup>
                        <ListGroup href="#"  onClick={(e)=>handle(e,list[4].id)} className={ list[4].display?'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Lesson Plan</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[5].id)} className={list[5].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Workshop/FDP organized</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[6].id)} className={list[6].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Guest Lecture/Seminar organized</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[7].id)} className={list[7].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Mooc's/Certifications</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[8].id)} className={list[8].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Award/Achievements</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[9].id)} className={list[9].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Paper published</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[10].id)} className={list[10].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Workshop/FDP Attended</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[11].id)} className={list[11].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Industry Training</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[12].id)} className={list[12].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Guest Lectures Presented</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[13].id)} className={list[13].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Patents/Copyrights</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Result Analysis</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Feedback Report</ListGroup>
                    </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
               {<FacultyDataComponent display={list[0].display}/>}
               {<SubjectDataComponent display={list[1].display}/>}
               {<SubjectAllocationComponent display={list[2].display}/>}
               {<SyllabusStatusComponent display={list[3].display}/>}
               {<LessonPlanComponent display={list[4].display}/>}
               {<FdpComponent display={list[5].display}/>}
               {<SeminarComponent display={list[6].display}/>}
               {<FacultyFdpComponent display={list[10].display}/>}
               {<AwardComponent display={list[8].display}/>}
               {<PublishComponent display={list[9].display}/>}
               {<CertificationComponent display={list[7].display}/>}
               {<IndustryTrainingComponent display={list[11].display}/>}
               {<GuestLecturesComponent display={list[12].display}/>}
               {<PatentComponent display={list[13].display}/>}
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;