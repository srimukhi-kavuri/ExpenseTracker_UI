import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn, } from 'react-bootstrap-table';
import axios from 'axios'
import Menu from  '../Menu/menu'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

 class Budget extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
            loginData: JSON.parse(localStorage.getItem('loginData')),
            startDate: "",
            amount:"",
            description:"",
            budgetList:[],
            isSuccess:false,
         }
     }

     componentDidMount(){
         this.getBudgetData()
     }

     getBudgetData= () => {
        debugger
        var budget = {}
        budget.email = this.state.loginData.email
       
        axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/display_budget_table/",JSON.stringify(budget))
        .then(response=>{
           if(response.data.length>0){
               this.setState({budgetList:response.data})
           }
          console.log(response.data)
        }).catch(error => {
            console.log(error);
        });
     }

     saveBudget = () => {
        debugger
          var budgetData = {}
          budgetData.date = this.state.startDate
          budgetData.amount = this.state.amount
          budgetData.description = this.state.description
          budgetData.email = this.state.loginData.email

          axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/add_income_details/",JSON.stringify(budgetData))
          .then(response=>{
              
                  this.setState({isSuccess:true})
              this.getBudgetData()
            console.log(response.data)
          }).catch(error => {
              console.log(error);
          });
      }
     
    render() {
   const data= []
        return (
            <React.Fragment>
                <Menu/>
                <SweetAlert
                    show={this.state.isSuccess}
                    title="Save"
                    text="Your budget details added Successfully"
                    type='success'
                    onConfirm={() => this.setState({ isSuccess: false })}
            />

                <form style={{marginTop:"2%"}}>
     <div class="form-group">
        <div class="row">
          
         <div class="col-md-3">
        <label>Amount</label>
        <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Ammount is in €" 
        value={this.state.amount} onChange={(e)=>this.setState({amount:e.target.value})}/>
    </div>

    <div class="col-md-3">
    <label >Date</label>
    <input type="date" class="form-control" value={this.state.startDate} id="exampleInputDate1"
    onChange={(e)=>this.setState({startDate:e.target.value})} placeholder="Date"/>
    </div>

<div class="col-md-3">
        <label>Description</label>
        <input type="text" class="form-control" value={this.state.description} id="description"
    onChange={(e)=>this.setState({description:e.target.value})} placeholder="Description"/>
     </div>

<div class="col-md-3">
  <input type="button" class="form-control btn btn-success" style={{marginTop:"7%"}} id="exampleInputDate1" value="Submit"
   onClick={()=>this.saveBudget()}/>
  </div>
        </div>
    </div>
        
</form>
                <BootstrapTable
                                data={this.state.budgetList}
                                pagination={true}
                                // options={options}
                                search
                                bordered
                                // exportCSV
                            
                               >

                                 <TableHeaderColumn dataField="date"  isKey={true}  className = {"columnHeaderColor"}  dataSort={true} 
                                      expandable={false} editable={false}   width="100px">Date</TableHeaderColumn>

                                        <TableHeaderColumn dataField ="amount"  className={"columnHeaderColor"} dataSort={true}
                                        expandable={false}  insertRow={true} editable={false} dataAlign="left" width="100px">Amount</TableHeaderColumn>

                                      <TableHeaderColumn dataField ="description"  className={"columnHeaderColor"} dataSort={true}
                                        expandable={false}  insertRow={true} editable={false} dataAlign="left" width="100px">Description</TableHeaderColumn>
                                  </BootstrapTable>
          </React.Fragment>
        )
    }
}

export default Budget
