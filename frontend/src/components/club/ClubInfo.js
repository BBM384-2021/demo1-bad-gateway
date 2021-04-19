import React, {Component} from "react";
import * as clubActions from "../../api/actions/club";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {LoadingStates} from "../../constants/common";
import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    Loader,
} from "semantic-ui-react";
import defaultClubImage from '../../static/image/white-image.png'
import Page from "../base/Page";

class ClubInfo extends Component {

    state = {
        status: LoadingStates.NOT_LOADED,
        club: {},
    };

    constructor(props) {
        super(props);
        this.handleClubInfo = this.handleClubInfo.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {auth} = this.props;
        console.log(auth)
        this.props.getClubInfo(id, this.handleClubInfo);
    }

    handleClubInfo(data) {
        this.setState({
                club: data,
                status: LoadingStates.LOADED
            }
        )
    }

    render() {

        const {status} = this.state;
        const {auth} = this.props;
        if (status !== LoadingStates.LOADED) {
            return (
                <Loader active>
                    Loading...
                </Loader>
            )
        }


        return (
            <Page>
                <Grid divided centered padded="vertically">
                    <Grid.Column width={4}>
                        <Image
                            centered
                            size='medium'
                            src={defaultClubImage}
                        />

                    </Grid.Column>
                    <Grid.Column width={8}>
                        {auth && console.log(auth.roles)}
                        <Header as='h2' icon textAlign='center' color="violet">
                            <Icon name='users' circular/>
                            <Header.Content>{this.state.club.name} Club</Header.Content>
                        </Header>
                        <Header as='h5' icon textAlign='center' sub>
                            <Header.Content>Category</Header.Content>
                        </Header>
                        <Header as='h4' icon textAlign='center'>
                            <Header.Content>{this.state.club.category.name.toUpperCase()}</Header.Content>
                        </Header>
                        <Header as='h5' icon textAlign='center' sub>
                            <Header.Content>Status</Header.Content>
                        </Header>
                        <Header as='h5' icon textAlign='center'>
                            <Header.Content>{this.state.club.status}</Header.Content>
                        </Header>
                        <Divider/>
                        <Header as='h4' icon textAlign='center'>
                            <Header.Content><a><Icon name='user' color="violet"/> {this.state.club.members.length} Member
                            </a></Header.Content>
                        </Header>
                        <Button basic color='violet' fluid>
                            Join the Club
                        </Button>

                    </Grid.Column>
                    <Grid.Column width={4} textAlign="justified">
                        <Header as='h2' icon textAlign='center' >
                            <Header.Content>Description</Header.Content>
                            <Divider/>
                        </Header>
                        <Header as='h4' icon textAlign='center'>
                            <Header.Content>{this.state.club.description}</Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid>
            </Page>

        )


    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getClubInfo: (id, callback) => {
            dispatch(clubActions.clubInfoAction(id, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {

    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClubInfo))