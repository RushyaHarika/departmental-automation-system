import React,{useEffect,useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPowerOff,faBell ,faBars} from "@fortawesome/free-solid-svg-icons";
import {NavWrapper,Brand,SideBarButton,NavA,MainWrapper} from "../../Style";
import SideBarComponent from './FacultySideBarComponent';

function HodHomeComponent(){
    const [sideBarDisplay, setSideBarDisplay] = useState(true);
    const SideBarHandle=(e)=>{
        e.preventDefault();
        setSideBarDisplay(!sideBarDisplay);
    }
    useEffect(() => {
        setSideBarDisplay(true);
    }, [])

    return(
        <MainWrapper>
            <div>
                <NavWrapper className="navbar navbar-expand-lg navbar-dark">
                    <SideBarButton onClick={SideBarHandle}><FontAwesomeIcon icon={faBars}/></SideBarButton>
                    <Brand className="navbar-brand" href="#" ><span style={{color:"black"}}>DepartmentalAutom</span><span>ationSystem</span></Brand>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="container-fluid">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mt-3 mr-5">
                                    <NavA style={{fontSize:"2.5rem"}} className="nav-link" href="#"><span className="mr-5"><FontAwesomeIcon className="mr-5" icon={faBell}/></span></NavA>
                                </li>
                                
                                <li className="nav-item mt-3">
                                    <NavA className="nav-link" href="/"><span><FontAwesomeIcon className="mr-3" icon={faPowerOff}/></span> Logout</NavA>
                                </li>
                            </ul>
                        </div>
                    </div>
                </NavWrapper>
                <SideBarComponent display={sideBarDisplay}/>            
            </div>
        </MainWrapper>

    )
}


export default HodHomeComponent;