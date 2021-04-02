import { memo } from 'react';
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";
import { Layout, Menu, Breadcrumb } from 'antd';
const LayoutComponent = ({header=true,children}) => {
	return (
		<Layout>
			{header && <HeaderComponent/>}
			<main>
				{children}
			</main>
			<FooterComponent />
		</Layout>
	);
}

export default memo(LayoutComponent);