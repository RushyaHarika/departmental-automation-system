import React, { useState } from "react"
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";
import validator from 'validator';

function ForgotPassword(props) {
  let params = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [errorMessage, setErrorMessage] = useState('')
  const validate = (value) => {
  
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('');
    } else {
      setErrorMessage('Password should have atleast one capital letter, small letter, number and a symbol')
    }

  }
  
  const handleSubmit = async (e) =>{
    if(newPassword!=confirmPassword){
      window.alert("New password and Confirm password should be same");
    } else if(newPassword=='' || confirmPassword=='') {
      window.alert("Password should not be empty");
    } else if (validator.isStrongPassword(newPassword, {
       minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
      window.alert("Password updated successfully");
      const res=await fetch("/api/login/"+params.user,{
        method:"PUT",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          password:newPassword
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);
      }else{
        window.alert("Password updated successfully");
      }

    } else {
        setErrorMessage('Password should have atleast one capital letter, small letter, number and a symbol.');
    }
  }

  return(
      <div
        style={{
          height:'100',
          padding: "20px",
          margin: "100px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Form>
  <Form.Group controlId="formBasicID">
    <Form.Label>Faculty ID</Form.Label>
    <Form.Control type="text" value={params.user} readOnly/>
    <Form.Text className="text-muted">
      Check your id before password reset
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword1">
    <Form.Label>Enter New Password</Form.Label>
    <Form.Control type="password" placeholder="New Password" onChange = {  e => {setNewPassword(e.target.value);
                                                                                  validate(e.target.value)}}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword2">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" onChange = {  e => setConfirmPassword(e.target.value) }/>
  </Form.Group>
  {
    errorMessage?<div className="alert alert-danger text-center">
                  {errorMessage}
                 </div>:''
                            } 
  <Button variant="primary" type="submit" onClick = {  handleSubmit}>
    Submit
  </Button>
</Form>

</div>
    )
  }

export default ForgotPassword;