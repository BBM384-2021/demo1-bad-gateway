import React, { useEffect } from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import { useForm, Controller } from 'react-hook-form';
import {useAuthContext} from "../../context/Auth";
const { Content } = Layout;

const Login = () => {
  const { control, register, handleSubmit, setValue } = useForm();
	const {userLogin,authState} = useAuthContext();
  // useEffect(()=>{
  // 	register({username:"username"},{required:true});
  // 	register({password:"password"},{required:true});
  // },[])

  const onSubmit = (data) => {
    userLogin(data);
  };
  return (
    <Content
      style={{
        padding: '0 150px',
        minHeight: '100%',
        marginTop: 64,
        overflow: 'initial',
      }}
    >
      {authState.isLoading ? <div style={{alignItems:"center",textAlign:"center",marginTop:"155px",marginBottom:"155px"}}><LoadingOutlined style={{fontSize:"60px"}} /></div> : <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input {...field}/>
            </Form.Item>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password {...field}/>
            </Form.Item>
          )}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </form>}
    </Content>
  );
};
export default Login;
