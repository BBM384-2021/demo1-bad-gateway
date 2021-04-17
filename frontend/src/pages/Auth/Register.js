import React, { useEffect,useState } from 'react';
import { Layout, Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useAuthContext } from '../../context/Auth';
import background from './pexels-photo-207896.jpeg';
import Text from 'antd/es/typography/Text';



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
    if(data.password===data.passwordConfirm){
      setPasswordMatch(true);
      userRegister(data);
    }
    setPasswordMatch(false);
  };
  return (
    <div style={{
      backgroundImage: 'url(${background})'
    }}>>
      <Row justify="left" align={'middle'}  style={{
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '200px',
        marginLeft: "900px",
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
        )}
      </Row>
    </div>
  );
};
export default Register;
