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
    useEffect(() => {
        setList(initialList);
    }, [])

    return(
        <HomeWrapper className="row">
            <div className="col-md-2">
                {props.display?
                    <ListGroupWrapper>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[0].id)}  className={ list[0].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Faculty Data</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Subject Allocation</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[2].id)} className={ list[2].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >Syllabus Status</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Lesson Plan</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[4].id)} className={list[4].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Workshop/FDP attended</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[5].id)} className={list[5].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Paper published</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[6].id)} className={list[6].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Awards/Achievements</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[7].id)} className={list[7].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Mooc's/Certifications</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[8].id)} className={list[8].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Industry Training</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Result Analysis</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Feedback Report</ListGroup>
                    </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
               {<FacultyDataComponent display={list[0].display}/>}
               {<SyllabusStatusComponent display={list[2].display}/>}
               {<FdpComponent display={list[4].display}/>}
               {<AwardComponent display={list[6].display}/>}
               {<PublishComponent display={list[5].display}/>}
               {<CertificationComponent display={list[7].display}/>}
               {<IndustryTrainingComponent display={list[8].display}/>}
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;