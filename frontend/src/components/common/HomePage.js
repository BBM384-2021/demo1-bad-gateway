import React, {Component} from "react";
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import {
    Button,
    Form,
    Loader,
    Segment,
    Grid,
    Message,
    Card,
    Dropdown,
    Select
} from 'semantic-ui-react';
import Page from "../base/Page";
import {Link} from 'react-router-dom';
import {searchAction} from "../../api/actions/search";
import ClubsItem from "../club/ClubsItem";


class HomePage extends Component {

    state = {
        status: LoadingStates.NOT_LOADED,
        name: ""
    }

    constructor(props) {
        super(props);
        this.handleSearchResult = this.handleSearchResult.bind(this);
    }

    componentDidMount() {
        this.props.getSearchResult(0, this.state.name, this.handleSearchResult);
    }


    handleSearchResult(data) {

        this.setState({
            searchList: data,
            status: LoadingStates.LOADED
        })

    }

    handleSearch = (event) => {
        this.props.getSearchResult(0, this.state.name, this.handleSearchResult);
    };

    handleInputChange = (event) => {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
            return;

        this.setState({
            ...this.state,
            [event.target.id]: value
        })

    };


    render() {


        if (this.state.status !== LoadingStates.LOADED) {
            return (
                <Loader active>
                    Loading...
                </Loader>
            )
        }

        return (

            <Page>
                <Page.Header hasBackButton={false} dividerIcon={"world"}>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap"/>
                    <Page.Header.Item><p style={{color: "black", fontFamily: 'Ubuntu Mono ', fontSize: "30px"}}>Home
                        Page</p></Page.Header.Item>
                </Page.Header>

                <Page.Content>
                    <Form onSubmit={this.handleSearch}>
                        <Form.Group>
                            <Form.Field>
                                <Form.Input id={"name"}
                                            placeholder=''
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                            inline
                                />
                            </Form.Field>

                            <Form.Button content='Search'/>
                        </Form.Group>
                    </Form>


                    <Card.Group itemsPerRow={4}>
                        {
                            this.state.searchList.clubs.map((club) =>
                                <ClubsItem
                                    key={club.id}
                                    club={club}
                                />
                            )
                        }
                        {
                            this.state.searchList.subClubs.map((subClub) =>
                                <ClubsItem
                                    key={subClub.id}
                                    club={subClub}
                                    isSubClub
                                />
                            )
                        }
                    </Card.Group>

                </Page.Content>
            </Page>


        )


    }

}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSearchResult: (page, name, callback) => {
            dispatch(searchAction(page, name, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);