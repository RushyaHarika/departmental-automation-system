import React,{ useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input,LoginList} from '../Style';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser,faUsers} from "@fortawesome/free-solid-svg-icons";

function LoginComponent() {
    const [hod, setHod] = useState(true);
    const [faculty,setFaculty]=useState(false);

    const hodHandle=(e)=>{
        e.preventDefault();
        setHod(!hod);
        setFaculty(!faculty);
    }

    const facultyHandle=(e)=>{
        e.preventDefault();
        setHod(!hod);
        setFaculty(!faculty);
    }

  return(
    <div>
        <div className="row pt-5">
                <div className="col-sm-12 p-5"></div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2 p-0">
                    
                        <LoginList href="#" onClick={hodHandle} 
                            className={ hod? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>
                            <div style={{paddingLeft:"40%",paddingTop:"15%"}}>
                            <span style={{fontSize:"45px"}}>
                                <FontAwesomeIcon icon={faUser}/>
                            </span>
                            <h6 className="pb-5">HOD</h6> 
                        </div>
                        </LoginList>
                        <LoginList href="#" onClick={facultyHandle} 
                            className={ faculty? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >
                            <div style={{paddingLeft:"35%",paddingTop:"15%"}}>
                                <span href="#" style={{fontSize:"45px"}}>
                                    <FontAwesomeIcon icon={faUsers}/>
                                </span>
                                <h6 className="pb-5">Faculty</h6>
                            </div>
                        </LoginList>
                    
                </div>
                {
                    faculty?
                    <div className="col-sm-6" style={{borderLeft:"1px solid #8395a7"}}>
                        <form>
                            <div className="text-center pl-3 pr-3 pt-4 pb-3">
                                <h2>Faculty Login</h2>
                            </div>
                            <div className="form-group pl-3 pr-3">
                                <Input type="text"
                                    placeholder="Username or Email"
                                />
                            </div>
                            <div className="form-group pl-3 pr-3 pt-1">
                                <Input 
                                    type="password" 
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group pt-4 pb-3 pl-3 pr-3">
                                <button 
                                    className="col-sm-12" 
                                    style={{backgroundColor:"#16a085",border:"6px",borderRadius:"2px",padding:"6px",color:"white",fontSize:"18px"}}
                                    type="submit"
                            >LogIn</button>
                            </div> 
                            <div className="text-center pt-2 ">
                                <p><a href="/forgot" style={{color:"black"}}>Forgot Password?</a></p>
                            </div>                   
                        </form>
                    </div>:''
                }
                {
                        hod?
                        <div className="col-sm-6" style={{borderLeft:"1px solid #8395a7"}}>
                            <form>
                                <div className="text-center pl-3 pr-3 pt-5 pb-5">
                                    <h2>HOD Login</h2>
                                </div>
                                <div className="form-group pl-3 pr-3">
                                    <Input 
                                        type="password" 
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="form-group pt-4 pb-3 pl-3 pr-3">
                                    <button 
                                        className="col-sm-12" 
                                        style={{backgroundColor:"#16a085",border:"6px",borderRadius:"2px",padding:"6px",color:"white",fontSize:"18px"}}
                                        type="submit"
                                >LogIn</button>
                                </div> 
                                <div className="text-center pt-2 ">
                                    <p><a href="/forgot" style={{color:"black"}}>Forgot Password?</a></p>
                                </div>                   
                            </form>
                        </div>:''
                }
                </div>
    </div>
  )
}

export default LoginComponent;