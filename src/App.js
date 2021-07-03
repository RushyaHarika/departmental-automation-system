import React,{useState} from "react"
import {BrowserRouter,Router,Switch,Route} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HodHomeComponent from './components/hodComponents/HodHomeComponent';
import FacultyHomeComponent from './components/facultyComponents/FacultyHomeComponent';
import ForgotComponent from './components/ForgotComponent';

function App() {
    const [authenticated,setAuthenticated]=useState(false);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={() => <LoginComponent authenticated={authenticated} setAuthenticated={p => {setAuthenticated(p)}}/>}/>
                <Route path="/hod" exact component={authenticated?HodHomeComponent:() => <LoginComponent authenticated={authenticated} setAuthenticated={p => {setAuthenticated(p)}}/>}/>
                <Route path="/faculty/:id" exact component={authenticated?FacultyHomeComponent:() => <LoginComponent authenticated={authenticated} setAuthenticated={p => {setAuthenticated(p)}}/>}/>
                <Route path="/forgot/:user" exact component={ForgotComponent}/>
                <Route component={() => <LoginComponent authenticated={authenticated} setAuthenticated={p => {setAuthenticated(p)}}/>}/>
            </Switch>   
        
        </BrowserRouter>
    )
}

export default App