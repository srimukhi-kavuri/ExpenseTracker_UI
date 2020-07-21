import React, { Component } from 'react'
import axios from 'axios'
import './CSS/expense.css'
import Menu from '../Menu/menu'
import Chart from "react-google-charts";
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);


const state = {
    labels: ['January', 'February'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59]
      }
    ]
  }

//   const data = [
//     ["Element", "Density", { role: "style" }],
//     ["Copper", 8.94, "#b87333"], // RGB value
//     ["Silver", 10.49, "silver"], // English color name
//     ["Gold", 19.3, "gold"],
//     ["Platinum", 21.45, "color: #e5e4e2"] // CSS-style declaration
//   ];
class Expense extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            startDate: "",
            expensename:"",
            amount:"",
            description:"",
            member:"",
            paymentmethod:"",
            loginData: JSON.parse(localStorage.getItem('loginData')),
            isSuccess:false,
            graphData:[],
            expensevsbudgetData:{}
        }
    }

    componentDidMount(){
       this.expensevsincomegraph()
       this.totalbudgetvsexpense()
    }

    totalbudgetvsexpense = () =>{
      var expensevsbudget = {}
      expensevsbudget.email = this.state.loginData.email

  axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/total_exp_vs_income_conclusion/",
  JSON.stringify(expensevsbudget))
  .then(response=>{
         this.setState({expensevsbudgetData:response.data})
        console.log(response.data)
  }).catch(error => {
    console.log(error);
  });
    }

    expensevsincomegraph = () => {
      var data={}
      data.email = this.state.loginData.email
      axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/total_exp_vs_income_graph/",JSON.stringify(data))
		.then(response=>{
            // this.setState({graphData:response.data})

            const data = [
                ["Element", "Amount", { role: "style" }],
             
              ];
             
                  var data1 = []
                  data1.push(response.data[0].key)
                  data1.push(response.data[0].value)
                  data1.push("#b87333")

                  var data2 = []
                  data2.push(response.data[1].key)
                  data2.push(response.data[1].value)
                  data2.push("#b87333")

                  data.push(data1)
                  data.push(data2)

                  this.setState({graphData:data})
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
    }

    saveExpense = () => {
      debugger
        var expenseData = {}
	    	expenseData.date = this.state.startDate
		    expenseData.category = this.state.expensename
		    expenseData.amount = this.state.amount
        expenseData.description = this.state.description
        expenseData.member = this.state.member
        expenseData.payment_method = this.state.paymentmethod
        expenseData.email = this.state.loginData.email

		axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/add_expense_details/",JSON.stringify(expenseData))
		.then(response=>{
            if(response.data.message == "Your expense details added Successfully"){
                this.setState({isSuccess:true})
            }
          console.log(response.data)
		}).catch(error => {
			console.log(error);
		});
    }
     
   
    sendReport = () => {
      var sendreport = {}
      sendreport.email = this.state.loginData.email
     
      axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/send_report_to_email_updated/",JSON.stringify(sendreport))
      .then(response=>{
        console.log(response.data)
      }).catch(error => {
          console.log(error);
      });
   }
  
      

render() {
  console.log(this.state.expensevsbudgetData)
    return (
        <React.Fragment>
         <Menu/>
         <SweetAlert
                    show={this.state.isSuccess}
                    title="Save"
                    text="Your expense details added Successfully"
                    type='error'
                    onConfirm={() => this.setState({ isSuccess: false })}
            />
           <h3 style={{textAlign:"center"}}>Your total budget is: {this.state.expensevsbudgetData.Total_Income} €</h3>
           <h3 style={{textAlign:"center"}}>You've spent a total of: {this.state.expensevsbudgetData.Total_Expense} €</h3>

     <form style={{marginTop:"2%"}}>
     <div class="form-group">
        <div class="row">
            <div class="col-md-3">
                <label>Expense Category</label>
             <select class="form-control" placeholder="Select category" id="category" name="category"
            onChange={(e)=>this.setState({expensename:e.target.value})} >
              <option value="" selected>Select Category</option>
              <option value="medical">Medical</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="investment">Investment</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="etc">Etc</option>
            </select>
            </div>
     <div class="col-md-3">
        <label>Payment Method</label>
         <select class="form-control" placeholder="Select category" id="payment_method" name="category"
          onChange={(e)=>this.setState({paymentmethod:e.target.value})}>
            <option value="" selected>Select payment method</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
            </select>
            </div>

     <div class="col-md-3">
        <label>Amount</label>
        <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Ammount is in €" 
        value={this.state.amount} onChange={(e)=>this.setState({amount:e.target.value})}/>
    </div>

    <div class="col-md-3">
    <label >Expense Date</label>
    <input type="date" class="form-control" value={this.state.startDate} id="exampleInputDate1"
    onChange={(e)=>this.setState({startDate:e.target.value})} placeholder="Date"/>
    </div>

    <div class="col-md-3">
        <label>Select Member</label>
         <select class="form-control" placeholder="Select Member" id="member" name="member"
          onChange={(e)=>this.setState({member:e.target.value})}>
         <option value="" selected>Select member</option>
         <option value="parent">Parent</option>
         <option value="child">Child</option>
         <option value="wife">Wife</option>
         <option value="self">Self</option>
         <option value="other">Other</option>
         </select>
    </div>

    <div class="col-md-3">
        <label>Description</label>
        <input type="text" class="form-control" value={this.state.description} id="description"
    onChange={(e)=>this.setState({description:e.target.value})} placeholder="Description"/>
     </div>

     <div class="col-md-3">
  <input type="button" class="form-control btn btn-success" style={{marginTop:"7%"}} value="Submit"
   onClick={()=>this.saveExpense()}/>
  </div>

  <div class="col-md-3">
         <input type="button" class="form-control btn btn-success" style={{marginTop:"7%"}}  value="Send Report"
         onClick={()=>this.sendReport()}/>
         </div>

        </div>
    </div>
         
</form>

         <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={this.state.graphData}
        />
            </React.Fragment>
        )
    }
}

export default Expense
