import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import * as childrenUtil from '../../utils/childrenUtil';

import PropTypes from 'prop-types';

import PageHeader from "./PageHeader";
import PageOperation from "./PageOperations";
import PageContent from "./PageContent";

import '../../static/css/common/Page.css';



class Page extends Component {
    state = {

    };

    static propTypes = {
        hasBackButton: PropTypes.bool,
    };

    static defaultProps = {
        hasBackButton: false
    };

    componentDidMount() {

    }


    render() {
        const {
            children,
        } = this.props;

        if(!childrenUtil.isNil(children)){
            return (
                <div className={"page"}>
                    {children}
                </div>
            )
        }
        return (
            <div className={"page"}>

            </div>
        )
    }
}

Page.Header = PageHeader;
Page.Operation = PageOperation;
Page.Content = PageContent;

export default withRouter(Page);