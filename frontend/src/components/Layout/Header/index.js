import { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Button, Row, Col, Avatar } from "antd";
import { useAuthContext } from "../../../context/Auth";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import * as PATHS from '../../../constants/paths';
import logo from './canva-chat-icon-MADhH4WiC_A.png'
import Text from 'antd/es/typography/Text';


const { Header } = Layout;
const HeaderComponent = () => {
  const { authState } = useAuthContext();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect on page load");
  }, []);

  return (
    <Header style={{
      background: '#7733FF',
      minHeight: 100,
      width: "100%",
      position: "fixed",
      zIndex: 1,
    }}>
      <div className="logo" />
      <Row justify="space-between" >
        <Col>
          <div style={{
            paddingTop: 10,
            background: '#7733FF',
          }}>
            <div key="1" onClick={()=> {history.push(PATHS.HOME)}}>
              <Row>
                <Col><img src={logo} width={100}/></Col>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"/>

                <Col><Text style={{ color: "white" , fontSize: "30px", fontFamily: 'Permanent Marker' }}>SpiritsUp</Text></Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col>
          {authState.isLogged ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
          	<div>
	            <Button type={"text"} size="large" style={{marginRight:15, marginTop:30, background: '#7733FF', color:"white"}} onClick={()=> {history.push(PATHS.LOGIN)}}>
		            Login
	            </Button>
	            <Button type={"text"} size="large"  style={{ background: '#7733FF', marginTop:30, color:"white"}} onClick={()=> {history.push(PATHS.REGISTER)}}>
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