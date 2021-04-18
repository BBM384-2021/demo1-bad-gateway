import React, {Component} from 'react';
import {Button, Icon, Table, Label} from "semantic-ui-react";
import * as userActions from "../../api/actions/user";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class UsersItem extends Component{

    constructor(props) {
        super(props);
        this.toggleUserStatus = this.toggleUserStatus.bind(this);
    }

    toggleUserStatus = (event)=>{
        this.props.toggleUserStatus(
            this.props.user.id,
            this.props.reload
        );
    };

    render(){
        const {user} = this.props;
        return(
            <Table.Row>
                <Table.Cell collapsing>
                    {this.props.auth.username === "admin" &&
                    <React.Fragment>
                        <Button as={ Link } to={"/user/update/" + user.id} title={"Düzenle"} icon compact circular size={"mini"}>
                            <Icon color={"blue"} name={'edit'} />
                        </Button>
                        <Button as={ Link } to={"/user/info/" + user.id} title={"Görüntüle"}  icon compact circular size={"mini"}>
                            <Icon color={"blue"} name={'search'} />
                        </Button>
                        <Button onClick={this.toggleUserStatus} title={"Değiştir"}  icon compact circular size={"mini"}>
                            <Icon color={"blue"} name={"trash"}/>
                        </Button>
                    </React.Fragment>
                    }

                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{
                    user.status === 'ACTIVE' ?
                        <Label color={"green"}>Aktif</Label>
                        :
                        <Label color={"red"}>Pasif</Label>
                }
                </Table.Cell>

            </Table.Row>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleUserStatus: (id, callback) => {
            dispatch(userActions.userStatusToggle(id, callback))
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersItem);

