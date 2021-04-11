import { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Button, Row, Col, Avatar } from "antd";
import { useAuthContext } from "../../../context/Auth";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import * as PATHS from '../../../constants/paths';
const { Header } = Layout;
const HeaderComponent = () => {
  const { authState } = useAuthContext();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect on page load");
  }, []);

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Row justify="space-between">
        <Col>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" onClick={()=> {history.push(PATHS.HOME)}}>
              Home
            </Menu.Item>
          </Menu>
        </Col>
        <Col>
          {authState.isLogged ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
          	<div>
	            <Button type="primary" size="large" style={{marginRight:15}} onClick={()=> {history.push(PATHS.LOGIN)}}>
		            Login
	            </Button>
	            <Button type="primary" size="large" onClick={()=> {history.push(PATHS.REGISTER)}}>
		            Register
	            </Button>
            </div>

          )}
        </Col>
      </Row>
    </Header>
  );
};
export default memo(HeaderComponent);