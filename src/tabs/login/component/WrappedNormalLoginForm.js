import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox,Card ,Row,Col} from 'antd';
import '../style/style.css';

import * as AuthService from '../service/AuthService'

const FormItem = Form.Item;

const SUCESS_COLOR = 'green'
const ERROR_COLOR = 'red'
const NORMAL_COLOR = 'blue'

class NormalLogin extends Component {

  state = {
    loginButtonLoading:false,
    loginButtonColor:NORMAL_COLOR,
    loginButtonMessage:'Ingresar',
    loginButtonIcon:'none',
    errorMessageDisplay:'none'

  }

  handleSubmit = (e) => {
    this.setState({loginButtonLoading:true})
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        setTimeout(()=>{this.loginUser(values)},2000)
      }
    });
  }

  rollBackButton = () => {
    this.setState({loginButtonLoading:false,
      loginButtonColor:NORMAL_COLOR,
      loginButtonMessage:'Ingresar',
      loginButtonIcon:'none',})
  }

  saveAuthData = (data) => {
    console.log('NormalLogin - save auth data');
    localStorage.setItem('token',data.token);
    localStorage.setItem('rol',data.rol);
  }

  loginUser = (authInfo) => {
    AuthService.authUser(authInfo).then((response)=>{
      console.log('NormalLogin - the user is logged');  
      console.log('NormalLogin - response',response);
      this.setState({loginButtonLoading:false})
      this.setState({loginButtonColor:SUCESS_COLOR,loginButtonIcon:'check',loginButtonMessage:''})
      this.saveAuthData(response.data)
      //aviso el container que el login fue correcto
      setTimeout(()=>{this.props.userLogged()},1000)
    }).catch((e)=>{
      console.log('NormalLogin -  the is not logged');
      console.log('NormalLogin -  error',e);
      this.setState({loginButtonLoading:false})
      this.setState({loginButtonColor:ERROR_COLOR,loginButtonIcon:'close',loginButtonMessage:'',errorMessageDisplay:'block'})
      setTimeout(this.rollBackButton,1000);
    })
  }

  

  render(){
    const { getFieldDecorator } = this.props.form;
        return  <div className="div-margin-top div-height">
        <Row type="flex" justify="space-around" align="middle">
        <Card 
        title={<div style={{width:'100%'}}><div><Row type="flex" justify="center" align="top"><Col>SIU GUARANI</Col></Row>
        </div><div><Row type="flex" justify="center" align="top"><Col>Ingrese sus datos</Col></Row></div></div>}
        style={{width: 300,boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
        >
           <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('usuario', {
                rules: [{ required: true, message: 'Por favor, ingrese su nombre de usuario!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Por favor, ingrese su contraseña!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
              )}
            </FormItem>
            <FormItem>
              <div style={{display:this.state.errorMessageDisplay,color:'red',fontSize:'9px'}}>
                  La contraseña o el usuario es incorrecto. Vuela a intentarlo.
              </div>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={this.state.loginButtonLoading} 
                className="login-form-button"
                style={{backgroundColor:this.state.loginButtonColor}}
                icon={this.state.loginButtonIcon}
              >
                {this.state.loginButtonMessage}
              </Button>
            </FormItem>
          </Form>
          </Card>
        </Row>
        </div> 
  }
}


const WrappedNormalLoginForm = Form.create()(NormalLogin);

export default WrappedNormalLoginForm;