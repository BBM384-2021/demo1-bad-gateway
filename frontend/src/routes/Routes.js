import React  from 'react';
import {Redirect} from 'react-router-dom';
import {intersection} from 'lodash';

import {PrivateRoutesConfig, PublicRoutesConfig} from './config';
import MapAllowedRoutes from './MapAllowedRoutes';

import {AuthStates} from "../constants/common";

import {BASE} from "../constants/urls";
import {getRoles} from "../utils/auth";

const isArrayWithLength = (arr) => {
    return (Array.isArray(arr) && arr.length)
};

const getAllowedRoutes = (routes) => {
    const roles = getRoles();

    return routes.filter(({ permission }) => {
        if(!permission || !isArrayWithLength(permission)) {
            return true;
        } else {
            return intersection(permission, roles).length;
        }
    });
};

const menuSorter = (a,b) => {
    let aPoint = a.menuOrderPoint || 0;
    let bPoint = b.menuOrderPoint || 0;
    if (aPoint > bPoint){
        return 1;
    } else if (aPoint < bPoint){
        return -1;
    }
    return 0;
};

export const getAllowedMenuRoutes = () => {

    const allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);

    return allowedRoutes.filter(({ menu }) => {
        if(menu) {
            return true;
        }
        return false;
    }).sort(menuSorter);
};

export const PublicRoutes = (props) => {
    const {auth} = props;

    let allowedRoutes = [];

    if (auth.loginStatus !== AuthStates.VALID)
        allowedRoutes = PublicRoutesConfig;
    else
        return <Redirect to="/" />;

    return (
        <MapAllowedRoutes routes={allowedRoutes} basePath={BASE} defaultUrl={"/login"} isAddNotFound />
    );
};

export const PrivateRoutes = (props) => {
    const {auth} = props;

    let allowedRoutes = [];

    if (auth.loginStatus === AuthStates.VALID)
        allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
    else
        return <Redirect to="/" />;

    return (
        <MapAllowedRoutes routes={allowedRoutes} basePath={BASE} defaultUrl={"/club/list"} isAddNotFound />
    );
};
