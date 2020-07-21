import React, { Component } from 'react'
import Modal from 'react-modal'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import axios from 'axios'
import '../Modal/modal.css'

const SweetAlert = withSwalInstance(swal);

class OTPModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           otp:'',
           invalidOtp:false
        }
    }
    
    
    
    
    varifyOTP = (e) => {
		debugger
        e.preventDefault()

		var otpData = {}
		otpData.otp = this.state.otp

		axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/my_otp_match/",JSON.stringify(otpData))
		.then(response=>{
            if(response.data.value=="success"){
                window.open('/expense','_self')
            }else{
                this.setState({invalidOtp:true})
            }
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
    }
    
    render() {
        return (
            <div>
                <SweetAlert
                    show={this.state.invalidOtp}
                    title="Invalid OTP"
                    text="Please check otp"
                    type='error'
                    onConfirm={() => this.setState({ invalidOtp: false })}
            />

                <Modal isOpen={this.props.isOpen} style={{left:"32% !important", top:"0 !important"}} >
                    <h2>OTP Verification</h2><br/>
                    <div >
					<div class="input-group"style={{width:"-webkit-fill-available", marginBottom:15}}>
						<input id="otp" type="text" class="form-control" name="otp"
						 placeholder="OTP"  onChange={(e)=>this.setState({otp:e.target.value})}/>
					</div>
                       
                    

                        <button class="button" onClick={this.props.onClose}>Close</button>
                        <button class="button" onClick={(e)=>this.varifyOTP(e)} >Verify OTP</button>
                       
                    </div>

                  
                </Modal>
            </div>
        )
    }
}

export default OTPModal
