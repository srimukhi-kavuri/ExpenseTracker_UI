import React, { Component } from 'react'
import {
    Router,
    Switch,
    Route
  } from "react-router-dom";
import Login from '../Login/login'
import Register from '../Registration/register'
import Expense from '../Expense/expense'
import History from '../Expense/history'
import Budget from '../Expense/budget'
import ExpenseHistory from '../Expense/expense_history'

  export default class RoutingHolder extends Component {

      render() {
          return (
              <div>
                <Router history={this.props.history}>
                  
                 <Switch>
                    <Route exact={true} path='/' render={() => <Login history={this.props.history}/>}/>
                    <Route path='/login' render={() => <Login history={this.props.history}/>}/>
                    <Route path='/register' render={() => <Register history={this.props.history}/>}/>
                    <Route path='/expense' render={() => <Expense history={this.props.history}/>}/>
                    <Route path='/history' render={() => <History history={this.props.history}/>}/>
                    <Route path='/budget' render={() => <Budget history={this.props.history}/>}/>
                    <Route path='/expensehistory' render={() => <ExpenseHistory history={this.props.history}/>}/>
                 </Switch>
                </Router>
              </div>
          )
      }
  }
  