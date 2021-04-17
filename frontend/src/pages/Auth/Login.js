import React, { useEffect } from 'react';
import { Layout, Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useAuthContext } from '../../context/Auth';
import Text from 'antd/es/typography/Text';
const { Content } = Layout;

const Login = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { userLogin, authState } = useAuthContext();
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    console.log("submit")
    userLogin(data);
  };
  return (
    <Row justify="center" align={'middle'} style={{
      alignItems: 'center',
      textAlign: 'center',
      marginTop: '100px'
    }}>
      {authState.isLoading ? (
        <div
          style={{
            alignItems: 'center',
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
          <Text style={{ color: "black" , fontSize: "30px", fontFamily: 'Ubuntu Mono' }}>LOGIN</Text>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item>
                <Input {...field}  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
                {errors.username && (
                  <p style={{ color: 'red', marginBottom: 0 }}>*Username is required</p>
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

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '300px', backgroundColor:'#48C2C6',  fontFamily: 'Ubuntu Mono'  }} >
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
      {/*</div>*/}
    </Row>
  );
};
export default Login;
