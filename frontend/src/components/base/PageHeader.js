import React, {Component} from 'react';
import {withRouter} from "react-router";
import {Breadcrumb, Button} from "semantic-ui-react";
import {PropTypes} from 'prop-types';


class PageHeaderItem extends Component {

    static defaultProps = {
        active: false,
    };

    render() {
        return(
            <Breadcrumb.Section active={this.props.active}>{this.props.children}</Breadcrumb.Section>
        )
    }
}

class PageHeader extends Component{

    static defaultProps = {
        hasBackButton: null,
        dividerIcon: "right chevron",
    };

    static propTypes = {
        hasBackButton: PropTypes.bool,
        dividerIcon:PropTypes.string
    };

    state = {
        hasBackButton: false,
    };

    componentDidMount() {
        if(this.props.hasBackButton === null){
            if(React.Children.count(this.props.children)> 1){
                this.setState({
                    hasBackButton: true,
                });
            }
        } else {
            this.setState({
                hasBackButton: this.props.hasBackButton,
            });
        }
    }

    render (){

        const {
            children
        } = this.props;

        const elements = React.Children.map(children, (child, index) =>{
            let isLast = React.Children.count(children) === index + 1;

            if(isLast){
                let activeProps = {...child.props, active: true};
                child = React.createElement(PageHeaderItem, activeProps);
            }

            return [
                child,
                !isLast && (
                    <Breadcrumb.Divider icon={this.props.dividerIcon}/>
                )
            ];
        });

        return(
            <React.Fragment>
                {
                    this.state.hasBackButton &&
                    <Button
                        circular compact
                        className={"navigateBack"}
                        icon={"left arrow"}
                        onClick={() => this.props.history.goBack()}
                    />
                }
                <Breadcrumb className={"title"} size={"massive"}>
                    {elements}
                </Breadcrumb>
            </React.Fragment>
        );
    }
};

PageHeader.Item = PageHeaderItem;

export default withRouter(PageHeader);