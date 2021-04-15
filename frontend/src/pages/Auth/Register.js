import React, { useEffect,useState } from 'react';
import { Layout, Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useAuthContext } from '../../context/Auth';


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
    <Row justify="center" align={'middle'}>
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
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item label="Email" name="email">
                <Input {...field} />
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
              <Form.Item label="Password" name="password">
                <Input.Password {...field} />
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
                  <Form.Item label="Password Confirm" name="passwordConfirm">
                    <Input.Password {...field} />
                    {!passwordMatch && <p style={{ color: 'red' }}>*Passwords should match</p>}
                  </Form.Item>
              )}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      )}
    </Row>
  );
};
export default Register;
