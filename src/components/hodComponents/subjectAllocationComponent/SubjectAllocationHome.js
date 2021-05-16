import React from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SubjectAdditionModal from './SubjectAdditionModal';

function SubjectAllocationComponent(props){
    const [modalShow, setModalShow] = React.useState(false);
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Subject Allocation</h5> 

                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course code</th>
                            <th>Subject</th>
                            <th>Faculty ID</th>
                            <th>Faculty name</th>
                            <th>Edit details</th>
                            <th>Remove Subject</th>
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
                        <tr>
                        <td colSpan='6'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Subject</Button></td>
                    </tr>
                    </tbody>
                </Table>

                <SubjectAdditionModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />   
            </div>:''
        )
}
export default SubjectAllocationComponent;