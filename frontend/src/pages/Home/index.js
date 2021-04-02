import React from 'react'
import { Layout } from 'antd';
const { Content } = Layout;

const Home = () => {
	return(
		<Content style={{ padding: '0 150px',minHeight:"100%", marginTop: 64 ,overflow: 'initial' }} >
			<div style={{ padding: 24, minHeight: 680 }}>
				Content
			</div>
		</Content>
	)
};
export default Home;