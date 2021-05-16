import React from 'react';
import Table from 'react-bootstrap/Table';
function FdpAttendedComponent(props){
        return(
            props.display?
            <div className="container-fluid">
                <div  className="pt-5 pb-5">Fdp Attended</div>
                <Table responsive>
                    <thead>
                        <tr>
                <th>#</th>
      {Array.from({ length: 20 }).map((_, index) => (
        <th key={index}>Table heading</th>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {Array.from({ length: 20 }).map((_, index) => (
        <td key={index}>cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>2</td>
      {Array.from({ length: 20 }).map((_, index) => (
        <td key={index}>cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>3</td>
      {Array.from({ length: 20 }).map((_, index) => (
        <td key={index}>cell {index}</td>
      ))}
    </tr>
  </tbody>
</Table>
            </div>:''
        )
}
export default FdpAttendedComponent;