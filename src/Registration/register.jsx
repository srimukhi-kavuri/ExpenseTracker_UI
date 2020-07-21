import React, { Component } from 'react'
import axios from 'axios'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import ModalHandler from '../Modal/modal'
import './CSS/main.css'
import './CSS/util.css'
import img1 from '../images/img-01.png'

const SweetAlert = withSwalInstance(swal);


export default class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
			 username:'',
			 password:'',
			 isOpen:false,
			 name:"",
			 email:"",
			 password:"",
			 address:"",
			 mobile:"",
			 checkName:true,
			 checkEmailFormat:true,
			 checkEmail:true,
			 checkMobile:true,
			 checkMobileLength:true,
			 checkAddress:true,
			 checkPasswordFormat:true,
			 checkPassword:true,
			 registerValue:"",
			 register:false
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

	signUp = (e) => {
		debugger
        e.preventDefault()
		if(this.state.name =="" || this.state.name==null){
			this.setState({checkName:false})
			 document.getElementById("name").focus(); 
			 return false; 
		}
	 
		if(this.state.email =="" || this.state.email==null){
			this.setState({checkEmail:false})
			 document.getElementById("email").focus(); 
			 return false; 
		}else if(this.state.checkEmailFormat==false){
			document.getElementById("email").focus(); 
			return false; 
		}

		 if(this.state.mobile =="" || this.state.mobile==null){	
			this.setState({checkMobile:false})	
			 document.getElementById("mobile_no").focus(); 
			 return false; 
		}
	 
		 if(this.state.mobile !="" && this.state.mobile!=null 
		   && (this.state.mobile.length < 10 || this.state.mobile.length > 10)){
			this.setState({checkMobileLength:false})	
			 document.getElementById("mobile_no").focus(); 
			 return false; 
		}
	 
	 
		 if(this.state.address =="" || this.state.address==null){
			 this.setState({checkAddress:false})
			 document.getElementById("address").focus(); 
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
			
		var registerData = {}
		registerData.name = this.state.name
		registerData.password = this.state.password
		registerData.email = this.state.email
		registerData.mobile_no = this.state.mobile
		registerData.address = this.state.address

		axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/add_user/",JSON.stringify(registerData))
		.then(response=>{
			this.setState({registerValue:response.data.message, register:true})
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
	}
    
    render() {

        return (
            <div className="limiter">
				 <SweetAlert
                    show={this.state.register}
                    title="Message"
                    text={this.state.registerValue}
                    type='error'
                    onConfirm={() => this.setState({ register: false })}
            />
		<div className="container-login100">
			<div className="wrap-login101">
				<div className="login100-pic js-tilt register-image" data-tilt>
					<img src={img1} alt="IMG"/>
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Member Register
					</span>

					<div class="input-group" style={{marginBottom:15, position:"sticky"}}>
						<span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
						<input id="name" type="text" value={this.state.name} className="form-control" name="name"
						 placeholder="Name" onChange={(e)=>this.setState({name:e.target.value, checkName:true})}/>
					</div>

					{/* <div className="wrap-input100 validate-input" >
						<input className="input100 input1" 
						title="Name"
						type="text" name="name" id="name" 
						placeholder="Name"  onChange={(e)=>this.setState({name:e.target.value, checkName:true})}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-user" style={{padding:"unset"}} aria-hidden="true"></i>
						</span>
					</div> */}
					{this.state.checkName == false &&
						<p style={{color:'red'}}>Name should not be blank</p>}

                  <div class="input-group" style={{marginBottom:15, position:"sticky"}}>
						<span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
						<input id="email" type="text" value={this.state.email} className="form-control" name="email"
						 placeholder="Email" onChange={(e)=>this.handleEmailChange(e)}/>
					</div>

					{/* <div className="wrap-input100 validate-input" >
						<input className="input100 input1" type="text"  
						title="Email"
						name="email" placeholder="Email" id="email" onChange={(e)=>this.handleEmailChange(e)}/>
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
						<span className="input-group-addon"><i className="glyphicon glyphicon-phone"></i></span>
						<input id="mobile_no" type="number" value={this.state.mobile} className="form-control" name="mobile"
						placeholder="Mobile Number" onChange={(e)=>this.setState({mobile:e.target.value,checkMobile:true,checkMobileLength:true})}/>
					</div>
{/* 
                    <div className="wrap-input100 validate-input">
						<input className="input100 input1" type="number" name="mobile"
						title="Mobile Number"
						 placeholder="Mobile Number" id="mobile_no" onChange={(e)=>this.setState({mobile:e.target.value,checkMobile:true,checkMobileLength:true})}rue/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-phone" aria-hidden="true"></i>
						</span>
					</div> */}
					{this.state.checkMobile == false &&
						<p style={{color:'red'}}>Mobile no. should not be blank</p>}

                {this.state.checkMobileLength == false &&
						<p style={{color:'red'}}>Mobile no. should not be less or greater than 10 digit</p>}

                     <div class="input-group" style={{marginBottom:15, position:"sticky"}}>
						<span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
						<input id="address" type="text" value={this.state.address} className="form-control" name="address"
						placeholder="Address" onChange={(e)=>this.setState({address:e.target.value,checkAddress:true})}/>
					</div>

                    {/* <div className="wrap-input100 validate-input" >
						<input className="input100 input1" type="text" name="address" 
						title="Address"
						placeholder="Address" id="address" onChange={(e)=>this.setState({address:e.target.value,checkAddress:true})}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-address-card" aria-hidden="true"></i>
						</span>
					</div> */}
					{this.state.checkAddress == false &&
						<p style={{color:'red'}}>Address should not be blank</p>}

                  <div class="input-group" style={{marginBottom:15, position:"sticky"}}>
						<span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
						<input id="password" type="password" value={this.state.password} className="form-control" name="password"
						placeholder="Password" onChange={(e)=>this.handlePasswordChange(e)}/>
					</div>

                    {/* <div className="wrap-input100 validate-input">
						<input className="input100 input1" type="password" name="pass" 
						title="Password"
						placeholder="Password" id="password" onChange={(e)=>this.handlePasswordChange(e)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div> */}
					{this.state.checkPasswordFormat == false &&
						<p style={{color:'red'}}>Password Must be 8 characters long having one special character, one lower case and one upper case letter</p>}

					{this.state.checkPassword == false &&
						<p style={{color:'red'}}>Password should not be blank</p>}

					<div className="container-login100-form-btn" onClick={(e)=>this.signUp(e)}>
						<button className="login100-form-btn" >
							Sign Up
						</button>
					</div>

					<div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span>
						<span className="txt2" style={{cursor:'pointer'}} onClick={()=>this.setState({isOpen:true})}>
							Password?
						</span>
					</div>

					<div className="text-center p-t-136">
						<a className="txt2" href="/login">
							Have an account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
			{this.state.isOpen &&
						<ModalHandler isOpen={this.state.isOpen} onClose={()=>this.setState({isOpen:false})}/>
						}
		</div>
	</div>
        )
    }
}
