import React,{Component} from 'react';
import './style/style.css'
import WrappedNormalLoginForm from './component/WrappedNormalLoginForm'
import {Redirect} from "react-router-dom";
    
class LoginContainer extends Component {

  state = {
    userIsLogged:false,
  }

  getRender = () => {
    if(this.state.userIsLogged){
      return <Redirect to="/" />
    }
    return <WrappedNormalLoginForm 
            userLogged={this.userLogged}
            />
  }

  userLogged = () => {
    this.setState({userIsLogged:true})
  }


  
  render() {
    return this.getRender();
  }
}


export default LoginContainer;