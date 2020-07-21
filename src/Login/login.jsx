import React, { Component } from 'react'
import axios from 'axios'
import img1 from '../images/img-01.png'
import ModalHandler from '../Modal/modal'
import OTPModal from './otp-modal'
import Modal from 'react-modal'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import './CSS/main.css'
import './CSS/util.css'

const SweetAlert = withSwalInstance(swal);


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
			isOpen:false,
			email:'',
			password:'',
			checkPasswordFormat:true,
			checkPassword:true ,
			checkEmailFormat:true,
			checkEmail:true,    
			openOTPModal:false ,
			invalidCred:false  
        }
	}

	handleEmailChange = (e) => {
		this.setState({email:e.target.value,checkEmail:true})
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	 
		if (reg.test(e.target.value) == false) 
		{
			this.setState({checkEmailFormat:false})
			document.getElementById("email").focus(); 
			return false;
		}else{
			this.setState({checkEmailFormat:true})
		}
	}

	handlePasswordChange = (e) => {
		this.setState({password:e.target.value,checkPassword:true})

		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
     
            if (!strongRegex.test(e.target.value)) {
				this.setState({checkPasswordFormat:false})
             document.getElementById("password").focus(); 
             return false;
			}else{
				this.setState({checkPasswordFormat:true})
			}
	}

	sendOTP = (email) => {
		var sendOTPData = {}
		sendOTPData.email = email
		axios.post('http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/send_otp_to_email/',JSON.stringify(sendOTPData))
		.then(response=>{
			if(response.data.message=="OTP has sent on your email id"){
             this.setState({openOTPModal:true})
			}
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
	}
	
	login = (e) => {
		debugger
		e.preventDefault()
		if(this.state.email =="" || this.state.email==null){
			this.setState({checkEmail:false})
			 document.getElementById("email").focus(); 
			 return false; 
		}else if(this.state.checkEmailFormat==false){
			document.getElementById("email").focus(); 
			return false; 
		}

		if(this.state.password =="" || this.state.password==null){
			this.setState({checkPassword:false})
			 document.getElementById("password").focus(); 
			 return false; 
		}else if(this.state.checkPasswordFormat==false){
			document.getElementById("password").focus(); 
			return false; 
		}

		var loginData = {}
		loginData.email = this.state.email
		loginData.password = this.state.password
		axios.post('http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/user_validation/',JSON.stringify(loginData))
		.then(response=>{
			if(response.data.authentication=="success"){
				localStorage.setItem("loginData",JSON.stringify(response.data));
			  this.sendOTP(response.data.email)	
            //  this.setState({openOTPModal:true})
			}else{
				this.setState({invalidCred:true})
			}
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
	}
    
    render() {
        return (
            <div className="limiter">
				   <SweetAlert
                    show={this.state.invalidCred}
                    title="Invalid Credentials"
                    text="Please check email and password"
                    type='error'
                    onConfirm={() => this.setState({ invalidCred: false })}
            />
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={img1} alt="IMG"/>
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Member Login
					</span>
					<div class="input-group" style={{marginBottom:15, position:"sticky"}}>
						<span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
						<input id="email" type="text" value={this.state.email} className="form-control" name="email"
						 placeholder="Email" onChange={(e)=>this.handleEmailChange(e)}/>
					</div>
					{/* <div className="wrap-input100 validate-input" >
						<input className="input100 input1" title="Email" type="text" name="email"
						 id="email" placeholder="Email" value={this.state.email} onChange={(e)=>this.handleEmailChange(e)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div> */}
					{this.state.checkEmailFormat == false &&
						<p style={{color:'red'}}>Email format is not valid</p>}

                    {this.state.checkEmail == false &&
						<p style={{color:'red'}}>Email should not be blank</p>}


                   <div class="input-group" style={{marginBottom:15, position:"sticky"}}>
						<span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
						<input id="password" type="password" value={this.state.password} className="form-control" name="password"
						 placeholder="Password" onChange={(e)=>this.handlePasswordChange(e)}/>
					</div>

					{/* <div className="wrap-input100 validate-input">
						<input className="input100 input1" type="password" name="pass"  value={this.state.password}
						placeholder="Password" id="password"  onChange={(e)=>this.handlePasswordChange(e)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div> */}
						{this.state.checkPasswordFormat == false &&
						<p style={{color:'red'}}>Password Must be 8 characters long having one special character, one lower case and one upper case letter</p>}

					{this.state.checkPassword == false &&
						<p style={{color:'red'}}>Password should not be blank</p>}


					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={(e)=>this.login(e)}>
							Login
						</button>
					</div>
					   {this.state.openOTPModal &&
					   <OTPModal isOpen={this.state.openOTPModal} onClose={()=>this.setState({openOTPModal:false})}/>}
					<div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span>
						<span className="txt2" style={{cursor:'pointer'}} onClick={()=>this.setState({isOpen:true})} >
							 Password?
						</span>
						{this.state.isOpen &&
						<ModalHandler isOpen={this.state.isOpen} onClose={()=>this.setState({isOpen:false})}/>
						}
					</div>

					<div className="text-center p-t-136">
						<a className="txt2" href="/register">
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
        )
    }
}
