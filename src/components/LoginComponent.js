import React,{ useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input,LoginListGroupWrapper,LoginListGroup} from '../Style';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser,faUsers} from "@fortawesome/free-solid-svg-icons";

function LoginComponent() {
    const [hod, setHod] = useState(true);
    const [faculty,setFaculty]=useState(false);
    const [email,setEmail]=useState('');
    const [error,setError]=useState('');

    const handle=(e)=>{
        e.preventDefault();
        setHod(!hod);
        setFaculty(!faculty);
    }
    const validate=(e)=>{
        e.preventDefault();
        var emailPattern = new RegExp(/[a-z0-9._%+-]+@aec\.edu\.in$/g)
        if (!emailPattern.test(email)) {
                setError( 'please enter valid email');
        }
        else{
            setError('');
        } 
    }
    

  return(
    <div>
        <div className="row pt-5">
                <div className="col-sm-12 p-5"></div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2 p-0">
                    <LoginListGroupWrapper>
                        <LoginListGroup href="#" onClick={handle} 
                            className={ hod? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >
                            <div style={{paddingLeft:"40%",paddingTop:"15%"}}>
                            <span style={{fontSize:"45px"}}>
                                <FontAwesomeIcon icon={faUser}/>
                            </span>
                            <h6 className="pb-5">HOD</h6> 
                        </div>
                        </LoginListGroup>
                        <LoginListGroup href="#" onClick={handle} 
                            className={ faculty? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >
                            <div style={{paddingLeft:"35%",paddingTop:"15%"}}>
                                <span href="#" style={{fontSize:"45px"}}>
                                    <FontAwesomeIcon icon={faUsers}/>
                                </span>
                                <h6 className="pb-5">Faculty</h6>
                            </div>
                        </LoginListGroup>
                    </LoginListGroupWrapper>
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
                                    value={ email }
                                    onChange={ e => setEmail(e.target.value) }
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
                                    onClick={validate}
                            >LogIn</button>
                            </div> 
                            <div className="text-center pt-2 ">
                                <p><a href="/forgot" style={{color:"black"}}>Forgot Password?</a></p>
                            </div> 
                            {
                                error?<div className="alert alert-danger text-center">
                                        {error}
                                        </div>:''
                            }                  
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
