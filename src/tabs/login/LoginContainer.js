import React,{Component} from 'react';
import './style/style.css'
import * as AuthService from './service/AuthService'
import WrappedNormalLoginForm from './component/WrappedNormalLoginForm'
import {Redirect} from "react-router-dom";
    
class LoginContainer extends Component {

  state = {
    loginButtonLoading:false
  }

  userIsLogged = () => {
    return localStorage.getItem('rol') !== null;
  }

  getRender = () => {
    if(this.userIsLogged()){
      return <Redirect to="/" />
    }
    return <WrappedNormalLoginForm 
      loginUser = {this.handlerAuth}
      loginButtonLoading={this.state.loginButtonLoading}
    />
  }



  handlerAuth = (authInfo) =>{
    AuthService.authUser(authInfo).then((response)=>{
      console.log('LoginContainer - the user is logged');  
      console.log('LoginContainer - response',response);
      this.setState({loginButtonLoading:false})
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('rol',response.data.rol)
      this.setState({userIsLogged:true})
    }).catch((e)=>{
      console.log('LoginContainer -  the is not logged');
      console.log('LoginContainer -  error',e);
      
    })
  }
  
  render() {
    return this.getRender();
  }
}


export default LoginContainer;