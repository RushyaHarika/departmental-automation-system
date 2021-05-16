import React from 'react';
import Table from 'react-bootstrap/Table';
function AwardComponent(props){
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Awards/Achievements</h5>
                <Table responsive>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Faculty ID</th>
                            <th>Faculty Name</th>
                            <th>Award/Achievement</th>
                            <th>Awarded On</th>
                            <th>Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                        </tr>
                        <tr>
                            <td>2</td>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                        </tr>
                        <tr>
                            <td>3</td>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <td key={index}>cell {index}</td>
                        ))}
                        </tr>
                    </tbody>
                </Table>
            </div>:''
        )
}
export default AwardComponent;