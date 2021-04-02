import React, { memo } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
const FooterComponent = () => {
	return(
		<Footer style={{ textAlign: 'center',position:"sticky",flex:1,marginTop:"auto",flexShrink: 0,padding: 10,bottom:0 }}>
			Spirits Up ©2021 Created by Bad Gateway
		</Footer>

	);
}

export default memo(FooterComponent);