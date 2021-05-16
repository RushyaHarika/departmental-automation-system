import React from 'react';
import Table from 'react-bootstrap/Table';
function CertificationComponent(props){
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Certifications and MOOCs</h5>
                <Table responsive>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Faculty ID</th>
                            <th>Faculty Name</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Issued By(Institution)</th>
                            <th>Valid Till</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                        </tr>
                        <tr>
                            <td>2</td>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                        </tr>
                        <tr>
                            <td>3</td>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                        </tr>
                    </tbody>
                </Table>
            </div>:''
        )
}
export default CertificationComponent;