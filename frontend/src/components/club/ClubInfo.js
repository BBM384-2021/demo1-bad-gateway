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
import {Link} from "react-router-dom";
import {getRoles} from "../../utils/auth";

class ClubInfo extends Component {

    state = {
        status: LoadingStates.NOT_LOADED,
        club: {},
        roles:[]
    };

    constructor(props) {
        super(props);
        this.handleClubInfo = this.handleClubInfo.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
        this.handleDeleteInfo = this.handleDeleteInfo.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {auth} = this.props;
        console.log(auth)
        this.props.getClubInfo(id, this.handleClubInfo);
    }

    handleClubInfo(data) {
        let roles = getRoles();
        console.log(roles)
        this.setState({
                club: data,
                status: LoadingStates.LOADED,
                roles:roles
            }
        )
    }
    handleDeleteInfo(data) {
        console.log("delete")
        console.log(data)
        this.setState({
            club: data,
            status: LoadingStates.LOADED
        })
        this.props.history.push("/club/list")
    }
    sendDeleteRequest(){
        this.props.deleteClub(this.state.club.id,this.handleDeleteInfo)

    }

    render() {

        const {status,roles} = this.state;
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
                {roles ? roles.find((item)=> item==="ADMIN") && <div style={{display:"flex",justifyContent:"flex-end",paddingBottom:"2rem"}}>
                    <Link to={`/club/update/${this.state.club.id}`} style={{color: "#702BBA"}}>
                        <Button primary>
                            Update Club
                        </Button>
                    </Link>
                    <Button basic color='red' onClick={this.sendDeleteRequest}>
                        Delete Club
                    </Button>

                </div> : null}


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
        deleteClub: (id, callback) => {
            dispatch(clubActions.deleteClubAction(id, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {

    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClubInfo))