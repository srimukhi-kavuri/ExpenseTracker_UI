import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn, } from 'react-bootstrap-table';
import axios from 'axios'
import Menu from  '../Menu/menu'

class ExpenseHistory extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              expenseHistory:[],
              loginData: JSON.parse(localStorage.getItem('loginData')),
              month:""

         }
     }

      
     getExpenseHistoryByMonth= (e) => {
        debugger
        var expense = {}
        expense.month = e.target.value
        expense.email = this.state.loginData.email
        axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/monthly_expense_userwise/",JSON.stringify(expense))
        .then(response=>{
           if(response.data.length>0){
               this.setState({expenseHistory:response.data})
           }
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

    <form style={{marginTop:"2%"}}>
     <div class="form-group">
        <div class="row"> 
         <div class="col-md-3">
        <label>Month</label>
        <select class="form-control" placeholder="Select month" id="month" name="month"
          onChange={(e)=>this.getExpenseHistoryByMonth(e)}>
            <option value="" selected>Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
        </select>
    </div>


        </div>
    </div>
        
</form>

                <BootstrapTable
                    data={this.state.expenseHistory}
                    pagination={true}
                    search
                    bordered    
                 >

                <TableHeaderColumn dataField="category"  isKey={true}  className = {"columnHeaderColor"}  dataSort={true} 
                   expandable={false} editable={false}   width="100px">Name</TableHeaderColumn>

                <TableHeaderColumn dataField="amount"  className = {"columnHeaderColor"}  dataSort={true} 
                     expandable={false} editable={false}   width="100px">Amount(€)</TableHeaderColumn>

                <TableHeaderColumn dataField="date" className = {"columnHeaderColor"}  dataSort={true} 
                    expandable={false} editable={false}   width="100px">Date</TableHeaderColumn>

                <TableHeaderColumn dataField="payment_method" className = {"columnHeaderColor"}  dataSort={true} 
                    expandable={false} editable={false}  width="100px">Payment Method</TableHeaderColumn>

                <TableHeaderColumn dataField="payment_method"  className = {"columnHeaderColor"}  dataSort={true} 
                     expandable={false} editable={false}   width="100px">Payment Method</TableHeaderColumn>
                             
                <TableHeaderColumn dataField="member"  className = {"columnHeaderColor"}  dataSort={true} 
                    expandable={false} editable={false}   width="100px">member</TableHeaderColumn>

                <TableHeaderColumn dataField ="description" className={"columnHeaderColor"} dataSort={true}
                     expandable={false}  insertRow={true} editable={false} dataAlign="left" width="100px">Description</TableHeaderColumn>
                     
            </BootstrapTable>
          </React.Fragment>
        )
    }
}

export default ExpenseHistory
