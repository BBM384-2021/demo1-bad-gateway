import { memo } from 'react';
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";
import { Layout, Menu, Breadcrumb } from 'antd';
const LayoutComponent = ({header=true,children,full=false}) => {
	const height = window.innerHeight;
	const finalHeight = full ? height : '100%';
	return (
		<Layout style={{height:"100% !important"}}>
			{header && <HeaderComponent/>}
			<main style={{
				padding: '0 250px',
				marginTop: 80,
				overflow: 'auto',
				height:finalHeight
			}}>
				{children}
			</main>
			<FooterComponent />
		</Layout>
	);
}

export default memo(LayoutComponent);