import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import './modal.css'

const SweetAlert = withSwalInstance(swal);

class ModalHandler extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email1:"",
            password1:"",
            checkEmailFormat1:true,
            checkEmail1:true,
            checkPasswordFormat1:true,
			checkPassword1:true,
			otp:"",
			verifyEmail:false,
			verifyEmailSuccess: false,
			verifyOTP:false,
			forgotPasswordSuccess:false
        }
    }
    
    handleEmailChange = (e) => {
		this.setState({email1:e.target.value,checkEmail1:true})
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	 
		if (reg.test(e.target.value) == false) 
		{
			this.setState({checkEmailFormat1:false,verifyEmail:false})
			document.getElementById("email1").focus(); 
			return false;
		}else{
			this.setState({checkEmailFormat1:true})
		}
    }
    
    handlePasswordChange = (e) => {
		this.setState({password1:e.target.value,checkPassword1:true})

		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
     
            if (!strongRegex.test(e.target.value)) {
				this.setState({checkPasswordFormat1:false})
             document.getElementById("password1").focus(); 
             return false;
			}else{
				this.setState({checkPasswordFormat1:true})
			}
    }
    
    changePassword = (e) => {
		debugger
        e.preventDefault()
	
		if(this.state.email1 =="" || this.state.email1==null){
			this.setState({checkEmail1:false})
			 document.getElementById("email1").focus(); 
			 return false; 
		}else if(this.state.checkEmailFormat1==false){
			document.getElementById("email1").focus(); 
			return false; 
		}else if(this.state.verifyEmail==true){
			document.getElementById("email1").focus(); 
			return false; 
		}

		if(this.state.verifyOTP == true){
			document.getElementById("otp").focus(); 
			return false; 
		}
	 
		if(this.state.password1 =="" || this.state.password1==null){
			this.setState({checkPassword1:false})
			 document.getElementById("password1").focus(); 
			 return false; 
		}else if(this.state.checkPasswordFormat1==false){
			document.getElementById("password1").focus(); 
			return false; 
		}
			
		var loginData = {}
		loginData.password = this.state.password1
		loginData.email = this.state.email1

		axios.post('http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/update_password/',JSON.stringify(loginData))
		.then(response=>{
			this.setState({forgotPasswordSuccess:true})
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
    }
	
	validateEmail = () =>{
		var emailData = {}
		emailData.email = this.state.email1
		if(this.state.email1!=""){
		axios.post('http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/verify_email_for_forgot_pass/',JSON.stringify(emailData))
		.then(response=>{
			if(response.data.verify == "fail"){
				this.setState({verifyEmail:true, verifyEmailSuccess:false})
			}else{
				this.setState({verifyEmailSuccess:true,verifyEmail:false})
			}
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
	}
	}

	validateOtp = () =>{
		var otpData = {}
		otpData.otp = this.state.otp
		if(this.state.otp!=""){
		axios.post('http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/verify_otp_forgot_password/',JSON.stringify(otpData))
		.then(response=>{
			if(response.data.verify == "fail"){
				this.setState({verifyOTP:true})
			}
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
	}
	}

    render() {
        return (
            <div>
				   <SweetAlert
                    show={this.state.forgotPasswordSuccess}
                    title="Password Changed"
                    text="Your password has been successfully Updated"
                    type='success'
                    onConfirm={() => this.setState({ forgotPasswordSuccess: false })}
                 />
                <Modal isOpen={this.props.isOpen} style={{left:"32% !important", top:"0 !important"}} >
                    <h2>Forgot Password</h2><br/>
                <div >
					<div class="input-group"style={{width:"-webkit-fill-available", marginBottom:15}}>
						<input id="email1" type="text" class="form-control" name="email1"
						 placeholder="Email"  onChange={(e)=>this.handleEmailChange(e)} />
					</div>
                  
                        {this.state.checkEmailFormat1 == false &&
						<p style={{color:'red'}}>Email format is not valid</p>}

                      {this.state.checkEmail1 == false &&
						<p style={{color:'red'}}>Email should not be blank</p>}

						{this.state.verifyEmail==true &&
						<p style={{color:'red'}}>Email not registered with us</p>}

						{this.state.verifyEmailSuccess==true &&
						<p style={{color:'green'}}>OTP send on your registered email</p>}


				  <div class="input-group"style={{marginBottom:15}}>
				  <button class="button form-control" onClick={()=>this.validateEmail()} >Validate Email</button>
					</div>

                   <div class="input-group"style={{width:"-webkit-fill-available", marginBottom:15}}>
						<input id="otp" type="text" class="form-control" name="otp"
						 placeholder="OTP"  onChange={(e)=>this.setState({otp:e.target.value,verifyEmailSuccess:false,verifyOTP:false})}
						 onBlur={()=>this.validateOtp()} />
					</div>

					{this.state.verifyOTP &&
					<p style={{color:'red'}}>You have entered wrong OTP</p>}

                   <div class="input-group" style={{width:"-webkit-fill-available", marginBottom:15}}>
						<input id="password1" type="password" class="form-control" name="password1" placeholder="Password" onChange={(e)=>this.handlePasswordChange(e)}/>
					</div>

                  
                     {this.state.checkPasswordFormat1 == false &&
						<p style={{color:'red'}}>Password Must be 8 characters long having one special character, one lower case and one upper case letter</p>}

					{this.state.checkPassword1 == false &&
						<p style={{color:'red'}}>Password should not be blank</p>}

                        <button class="button" onClick={this.props.onClose}>Close</button>
                        <button class="button" onClick={(e)=>this.changePassword(e)} >Change Password</button>
                       
                    </div>

                  
                </Modal>
            </div>
        )
    }
}

export default ModalHandler
