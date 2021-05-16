import React from "react"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HodHomeComponent from './components/hodComponents/HodHomeComponent';
import FacultyHomeComponent from './components/facultyComponents/FacultyHomeComponent';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/hod" exact component={HodHomeComponent}/>
                <Route path="/faculty" exact component={FacultyHomeComponent}/>
            </Switch>   
        </Router>
    )
}

export default App