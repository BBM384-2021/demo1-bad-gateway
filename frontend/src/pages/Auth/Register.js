import React, { useEffect,useState } from 'react';
import { Layout, Form, Input, Button, Checkbox, Row, Col, Divider, Image } from 'antd';
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useAuthContext } from '../../context/Auth';
import background from '../../static/registerback.jpg';
import Text from 'antd/es/typography/Text';
import { checkPassword } from '../../utils/checkPassword';



const Register = () => {
  const [passwordMatch,setPasswordMatch] = useState(true);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { userRegister, authState } = useAuthContext();
  const [form] = Form.useForm();

  const onSubmit = (data) => {
    if(data.password===data.passwordConfirm && checkPassword(data.password)){
      setPasswordMatch(true);
      userRegister(data);
    }
    setPasswordMatch(false);
  };

  {/* <div className="row" data-aos="fade-up">
        <img src={background} alt="Norway" style={{width:"100%"}}/>
       </div>*/}

  return (
    <div style={{ backgroundImage: `url(${background})`, height: "100%"}}>
      <Row justify="left" align={'middle'}  style={{
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {authState.isLoading ? (
          <div
            style={{
              alignItems: 'right',
              textAlign: 'center',
              marginTop: '155px',
              marginBottom: '155px',
            }}
          >
            <LoadingOutlined style={{ fontSize: '60px' }} />
          </div>
        ) : (
          <div style={{marginTop: "200px", marginLeft: "1200px",  opacity: .9, color: '#fff'}}>
          <Form form={form} onFinish={handleSubmit(onSubmit)}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap"/>
            <Text style={{ color: "black" , fontSize: "30px", fontFamily: 'Ubuntu Mono' }}>JOIN US</Text>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Item>
                  <Input {...field} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
                  {errors.username && (
                    <p style={{ color: 'red', marginBottom: 0 }}>*Username is required</p>
                  )}
                </Form.Item>
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Item>
                  <Input {...field} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
                  {errors.username && (
                    <p style={{ color: 'red', marginBottom: 0 }}>*Email is required</p>
                  )}
                </Form.Item>
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Item>
                  <Input.Password {...field} prefix={<LockOutlined className="site-form-item-icon" />}
                                  type="password"
                                  placeholder="Password"/>
                  {errors.password && <p style={{ color: 'red' }}>*Password is required</p>}
                </Form.Item>
              )}
            />
            <Controller
                name="passwordConfirm"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <Form.Item>
                      <Input.Password {...field} prefix={<LockOutlined className="site-form-item-icon" />}
                                      type="password"
                                      placeholder="Password Confirm" />
                      {!passwordMatch && <p style={{ color: 'red' }}>*Passwords should match</p>}
                    </Form.Item>
                )}
            />

            <Form.Item>
              <Button type="primary" htmlType="submit"  style={{ width: '300px', backgroundColor:'#48C2C6', fontFamily: 'Ubuntu Mono' }} >
                Register
              </Button>
            </Form.Item>
          </Form>
          </div>
        )}
      </Row>
    </div>
  );
};
export default Register;
