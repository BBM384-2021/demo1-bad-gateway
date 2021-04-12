import { memo } from 'react';
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";
import { Layout, Menu, Breadcrumb } from 'antd';
const LayoutComponent = ({header=true,children}) => {
	const height = window.innerHeight;
	return (
		<Layout>
			{header && <HeaderComponent/>}
			<main style={{
				padding: '0 150px',
				marginTop: 80,
				overflow: 'initial',
				height:height
			}}>
				{children}
			</main>
			<FooterComponent />
		</Layout>
	);
}

export default memo(LayoutComponent);