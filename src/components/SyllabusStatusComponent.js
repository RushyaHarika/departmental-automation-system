import React from 'react';

function SyllabusStatusComponent(props){
        return(
            props.display?
            <div className="container-fluid">
                <div  className="pt-5 pb-5">Syllabus Status</div>
            </div>:''
        )
}
export default SyllabusStatusComponent;