import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
function FacultyAdditionModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Faculty Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
              <label className='col-sm-4'>Employee ID:</label>
              <input className='col-sm-6' type='textbox'/>
              <label className='col-sm-4'>Employee Name:</label>
              <input className='col-sm-6' type='textbox'/>
              <label className='col-sm-4'>Mobile:</label>
              <input className='col-sm-6' type='textbox'/>
              <label className='col-sm-4' >Qualification:</label>
              <input className='col-sm-6' type='textbox'/><br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <div className='col-sm-10'>
                <Button variant='primary' type='submit' style={{float:'right'}}>Submit</Button>
            </div>
        </Modal.Footer>
      </Modal>
    );
  }
  export default FacultyAdditionModal;