import React from "react"
import {BrowserRouter,Router,Switch,Route} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HodHomeComponent from './components/hodComponents/HodHomeComponent';
import FacultyHomeComponent from './components/facultyComponents/FacultyHomeComponent';
import history from './history';

function App() {
    return (
        <BrowserRouter>
        <Router>
            <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/hod" exact component={HodHomeComponent}/>
                <Route path="/faculty/:id" exact component={FacultyHomeComponent}/>
            </Switch>   
        </Router>
        </BrowserRouter>
    )
}

export default App