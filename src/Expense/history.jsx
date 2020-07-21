import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn, } from 'react-bootstrap-table';
import axios from 'axios'
import Menu from  '../Menu/menu'
 class History extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              expenseHistory:[],
              loginData: JSON.parse(localStorage.getItem('loginData')),

         }
     }

     componentDidMount(){
         this.getExpenseData()
     }

     
     getExpenseData= () => {
        debugger
        var expense = {}
        expense.email = this.state.loginData.email
       
        axios.post("http://ec2-13-58-231-37.us-east-2.compute.amazonaws.com:8002/exp_app/display_table_data/",JSON.stringify(expense))
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
                
    {/* <form> */}
     {/* <div class="form-group"> */}
        {/* <div class="row"> 
         <div class="col-md-3">
         <input type="button" class="form-control btn btn-success"  id="exampleInputDate1" value="Send Report"
         onClick={()=>this.sendReport()}/>
         </div>
         </div> */}
        {/* </div>         */}
        {/* </form> */}
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

export default History
