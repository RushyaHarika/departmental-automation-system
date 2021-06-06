import React,{useEffect,useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../Style";
import FdpAttendedComponent from './fdpComponent/FdpHome';
import SyllabusStatusComponent from './SyllabusStatusComponent/SyllabusStatusHome';
import CertificationComponent from './CertificationsComponent/CertificationsHome';
import GuestLectureComponent from './GuestLecturesComponent/GuestLectureHome';

function SideBarComponent(props){
    const initialList=[
        {
            id:1,
            display:true
        },{
            id:2,
            display:false
        },
        {
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
        }
    ]
    const [list,setList]=useState(initialList);
    
    const handle=(e,id)=>{
        e.preventDefault();
        console.log("entered");
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
                        <ListGroup href="#" onClick={(e)=>handle(e,list[0].id)} className='list-group-item list-group-item-action active'>Lesson Plan</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[1].id)} className={ list[1].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Syllabus Status</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[2].id)} className={ list[2].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Guest Lectures Presented</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[3].id)} className={ list[3].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Workshops / FDPs / Seminars / Trainings</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[4].id)} className=' list-group-item list-group-item-action active'>Papers Published</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[5].id)} className=' list-group-item list-group-item-action active'>Awards/Achievements</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[6].id)} className={ list[6].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>MOOCs/Certifications</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[7].id)} className= ' list-group-item list-group-item-action active'>Industry Training</ListGroup>
                    </ListGroupWrapper>:null
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
                {<SyllabusStatusComponent display={list[1].display}/>}
                {<GuestLectureComponent display={list[2].display}/>}       
                {<FdpAttendedComponent display={list[3].display}/>}
                {<CertificationComponent display={list[6].display}/>}
              
            </div>
        </HomeWrapper>
    )
}


export default SideBarComponent;