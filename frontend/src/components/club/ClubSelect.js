import React, {Component} from 'react';
import { Form } from 'semantic-ui-react'
import {connect} from "react-redux";
import * as clubActions from "../../api/actions/club";

class ClubSelect extends Component{

    state = {
        options: [],
    };

    static defaultProps = {
        all: false,
        hasEmptyLine: false,
    }

    constructor(props) {
        super(props);
        this.handleClubList = this.handleClubList.bind(this);
    }

    componentDidMount() {
        this.props.getClubs(this.handleClubList);
    }


    handleDropdownChange = (event, data) => {
        this.props.stateChangeCallback(data.value);
    };

    handleClubList = (data) => {
        let options = [];
        data.forEach((club) => {
            options.push({value: {id:club.id}, text:`${club.name}`});
        });
        this.setState({
            options: options,
        })
    };

    render(){
        const {hasEmptyLine, all} = this.props;

        return(
            <Form.Dropdown
                onChange={this.handleDropdownChange}
                placeholder='Select Club'
                search
                selection
                options={this.state.options}
                label={this.props.label}
            />
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getClubs: (callback) => {
            dispatch(clubActions.getEnrolledClubsAction(callback));
        }
    }
};

const mapStateToProps = (state, ownProps) => {

    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubSelect);