import React from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



function FacultyDataComponent(props){
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Faculty Data</h5> 

                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Faculty ID</th>
                            <th>Faculty Name</th>
                            <th>Mobile</th>
                            <th>Qualification</th>
                            <th>Edit details</th>
                            <th>Remove Faculty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                            <td><Button variant="primary">Edit</Button>{' '}</td>
                            <td><Button variant="danger">Remove</Button>{' '}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                            <td><Button variant="primary">Edit</Button>{' '}</td>
                            <td><Button variant="danger">Remove</Button>{' '}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                            <td><Button variant="primary">Edit</Button>{' '}</td>
                            <td><Button variant="danger">Remove</Button>{' '}</td>
                        </tr>
                        
                    </tbody>
                </Table>
                
            </div>:''
        )
}
export default FacultyDataComponent;