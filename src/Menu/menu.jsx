import React, { Component } from 'react'
import './menu.css'
class Menu extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
        loginData: JSON.parse(localStorage.getItem('loginData')),
        }
    }
    
    logOut = () => {
       window.open("/","_self")
    }
    render() {
        return (
            <div class="navbar">
                <a href="/expense">Home</a>
                <a href="/history">Expense History</a>
                <a href="/budget">Budget</a>
                <a href="/expensehistory">Month Wise Expense History</a>
                 <span  className="user" style={{background: 'deepskyblue',padding: '15px', cursor:'pointer'}} onClick={()=>this.logOut()}>LOGOUT</span>
                <span className="user">{this.state.loginData.username}</span> <i  className="fa fa-user"></i>
               
                </div>
        )
    }
}

export default Menu
