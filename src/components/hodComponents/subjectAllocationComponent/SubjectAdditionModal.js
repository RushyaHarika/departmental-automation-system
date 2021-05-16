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
              <div className="row container-fluid p-3">
                <select className="col-sm-4" name="subjects">
                    <option value="subject 1">subject 1</option>
                    <option value="subject 2">subject 2</option>
                    <option value="subject 3">subject 3</option>
                    <option value="subject 4">subject 4</option>
                </select>
                <div className="col-sm-4"></div>
                <select className="col-sm-4" name="faculty">
                    <option value="faculty 1">faculty 1</option>
                    <option value="faculty 2">faculty 2</option>
                    <option value="faculty 3">faculty 3</option>
                    <option value="faculty 4">faculty 4</option>
                </select> 
              </div>
               
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default FacultyAdditionModal;