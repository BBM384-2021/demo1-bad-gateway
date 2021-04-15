import React, { useEffect } from 'react';
import { Layout, Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useAuthContext } from '../../context/Auth';
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
    <Row justify="center" align={'middle'}>
      {/*<div style={{maxWidth:width/3,textAlign:"right",margin:"0 auto",position: "relative",backgroundColor:"white",padding:30,borderRadius:10,marginTop:height/5}} >*/}
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
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item label="Username" name="username">
                <Input {...field} />
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
              <Form.Item label="Password" name="password">
                <Input.Password {...field} />
                {errors.password && <p style={{ color: 'red' }}>*Password is required</p>}
              </Form.Item>
            )}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit">
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
