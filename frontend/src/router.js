import { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Loadable from 'react-loadable';
import * as PATHS from './constants/paths'
import LayoutComponent from "./components/Layout";
import {AuthContext} from "./context/Auth";

const PROTECTED_ROUTE = 'PROTECTED_ROUTE';
const PUBLIC_ROUTE = 'PUBLIC_ROUTE';

const Loading = () => null;
const routes=[
	{
		path: PATHS.HOME,
		component: Loadable({
			loader: () => import('./pages/Home'),
			loading: Loading,
		}),
		exact: true,
		routeGroup: PUBLIC_ROUTE,
		header: true,
	}
]



const Router = () => {
	const location = useLocation().pathname;

	return (
		<LayoutComponent header={routes.find((route) => route.path === location)?.header}>
			<Switch>
				{routes.map(({ routeGroup, path, component, exact = false }) =>
					routeGroup === PROTECTED_ROUTE ? (
						<ProtectedRoute key={path} path={path} exact={exact} component={component} />
					) : (
						<Route key={path} path={path} exact={exact} component={component} />
					)
				)}
				{/*<Route component={NotFound} />*/}
			</Switch>
		</LayoutComponent>
	);
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { authState } = useContext(AuthContext);
	return (
		<>
			{authState.isChecked && (
				<Route
					render={(props) =>
						authState.isLogged ? <Component {...props} /> : <Redirect to={PATHS.LOGIN} />
					}
					{...rest}
				/>
			)}
		</>
	);
};
export default Router;