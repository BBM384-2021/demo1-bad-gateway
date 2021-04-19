import React, {Component} from "react";
import {PropTypes} from "prop-types";
import {Divider, Icon, Label, Segment} from "semantic-ui-react";


const PageOperationButtons = (props) => {

    const {
        children,
        hasLabel,
        label,
        icon
    } = props;

    if(React.Children.count(children) < 1){
        return null;
    }

    return(
        <React.Fragment>
            {
                hasLabel &&
                    <Label color="blue" ribbon>
                        { icon &&
                            <Icon name={icon}/>
                        }
                        {label}
                    </Label>
            }
            {children}
        </React.Fragment>
    );
};

PageOperationButtons.defaultProps = {
    hasLabel: true,
    label: "İşlemler",
    icon: "cogs"
};

const PageOperationFilter = (props) => {

    const {
        children
    } = props;

    if(React.Children.only(children)){
        return(
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }


    return null;
};



class PageOperation extends Component{

    static defaultProps = {
        dividerIcon: "right chevron",
        showFilters: false,
    };

    static propTypes = {
        dividerIcon: PropTypes.string,
        showFilters: PropTypes.bool,
    };

    state = {
        showFilters: false,
    };

    constructor(props){
        super(props);
        this.toggleFilters = this.toggleFilters.bind(this);
    }

    componentDidMount() {
        this.setState({
            showFilters: this.props.showFilters,
        })
    }

    toggleFilters(){
        this.setState({
            showFilters: !this.state.showFilters,
        })
    }

    render (){

        const {
            children
        } = this.props;

        let buttons, filter, hasButtons = false, hasFilter = false;

        React.Children.forEach(children, (child)=>{
            if(child.type.name === PageOperationButtons.name){
                buttons = [child];
                hasButtons = true;
            }else if (child.type.name === PageOperationFilter.name){
                filter = [child];
                hasFilter = true;
            }
        });

        if(!hasButtons && !hasFilter){
            return null;
        }


        return(
            <Segment>
                {
                    hasButtons &&
                    buttons
                }
                {
                    hasFilter &&
                        <React.Fragment>
                            {
                                hasButtons ?
                                    <Divider horizontal className={"filter-divider"}>
                                        <Label color={"red"} as={"a"} icon onClick={this.toggleFilters}>
                                            <Icon name={"filter"}/>
                                            Filter
                                            <span> </span>
                                            <Icon name={this.state.showFilters ? "up chevron":"down chevron"} fitted/>
                                        </Label>
                                    </Divider>:
                                    <Label color="orange" as={"a"} ribbon onClick={this.toggleFilters}>
                                        <Icon name={"filter"}/>
                                        Filter
                                        <span> </span>
                                        <Icon name={this.state.showFilters ? "up chevron":"down chevron"} fitted/>
                                    </Label>
                            }
                            {
                                this.state.showFilters &&
                                    filter
                            }
                        </React.Fragment>
                }
            </Segment>
        );
    }
}

PageOperation.Buttons = PageOperationButtons;
PageOperation.Filter = PageOperationFilter;

export default PageOperation;