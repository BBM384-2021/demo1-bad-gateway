import React, {Component} from 'react';
import {Form} from 'semantic-ui-react'
import * as subClubActions from "../../api/actions/subClub";
import {connect} from "react-redux";

class SubClubSelect extends Component {
    state = {
        options: [],
    };

    static defaultProps = {
        all: false,
        hasEmptyLine: false,
    }

    constructor(props) {
        super(props);
        this.handleSubClubList = this.handleSubClubList.bind(this);
    }

    componentDidMount() {
        const {clubId} = this.props;
        if (clubId === null || clubId === "") {
            this.setState({
                options: []
            });
        } else {
            this.props.getSubClubs(clubId, this.handleSubClubList);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clubId !== this.props.clubId) {
            if (this.props.clubId === null || this.props.clubId === "") {
                this.setState({
                    options: []
                });
            } else {
                const {clubId} = this.props;
                this.props.getSubClubs(clubId, this.handleSubClubList);
            }
        }
    }

    handleSubClubList(data) {
        let options = [];
        data.forEach((subClub) => {
            options.push({value: {id: subClub.id}, text: `${subClub.name}`});
        });
        this.setState({
            options: options,
        })
    }

    handleDropdownChange = (event, data) => {
        this.props.stateChangeCallback(data.value);
    };

    render() {
        if (this.props.clubId) {
            return (
                <Form.Dropdown
                    onChange={this.handleDropdownChange}
                    placeholder='Select Sub Club'
                    search
                    selection
                    options={this.state.options}
                    label={this.props.label}
                />
            )
        }
        return (
            <Form.Dropdown
                onChange={this.handleDropdownChange}
                placeholder='Select Sub Club'
                selection
                label={this.props.label}
            />
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTroops: (clubId, callback) => {
            dispatch(subClubActions.getEnrolledSubClubsAction(clubId, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SubClubSelect);