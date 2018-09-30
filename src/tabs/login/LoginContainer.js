import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox,Card ,Row,Col} from 'antd';
import './style/style.css'
import * as AuthService from './service/AuthService'


const FormItem = Form.Item;
    
class NormalLoginForm extends Component {

  state = {
    loginButtonLoading:false
  }

  handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({loginButtonLoading:true})
            AuthService.authUser(values).then(()=>{
              console.log('the user is logged');  
              this.setState({loginButtonLoading:false})
            }).catch((e)=>{
              console.log('the is not logged');
            })
          }
        });
  }
  
  render() {
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
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={this.state.loginButtonLoading} 
                className="login-form-button"
              >
                Ingresar
              </Button>
            </FormItem>
          </Form>
          </Card>
        </Row>
        </div> 
      }
    }

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default WrappedNormalLoginForm;