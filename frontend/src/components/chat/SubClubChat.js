import React, {Component} from "react";

import {loadNewAction, sendMessageAction, messageListAction} from "../../api/actions/subclubchat";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Page from "../base/Page";
import {Button, Form, Loader, Segment, Grid, Header, SegmentGroup} from "semantic-ui-react";
import Message from "./Message";
import "../../static/css/common/Chat.css"
import {LoadingStates} from "../../constants/common";

/* TODO SUBCLUB TÜM DATASINI ÇEK*/

class SubClubChat extends Component {
    state = {
        message: "",
        id: 0,
        submitStatus: false,
        status: LoadingStates.LOADING,
        messageList: [],
        topMessage: null,
        bottomMessage: null,
    }

    constructor(props) {
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleMessageList = this.handleMessageList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoadHistory = this.handleLoadHistory.bind(this);
        this.handleBottomMessages = this.handleBottomMessages.bind(this);
        this.handleHistoryMessages = this.handleHistoryMessages.bind(this);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.setState({
            id: id
        })
        this.props.getMessageList(null, id, this.handleMessageList);

        this.interval = setInterval(this.loadNew, 3000);

        //setTimeout(() => {this.messageEnd.scrollIntoView({ behavior: 'smooth' })}, 600);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSendMessage(){
        this.setState({
            message: ""
        });
    }

    loadNew = (event) => {
        if(this.state.id !== 0){
            if(this.state.messageList !== null && this.state.messageList.length !== 0){
                console.log(this.state.messageList);
                this.props.getSubClubChatNew(this.state.messageList[0].sentAt, this.state.id, this.handleBottomMessages);
            }
            else{
                this.props.getSubClubChatNew(new Date("2999-01-03").toISOString(), this.state.id, this.handleBottomMessages);
            }
        }
    };

    handleBottomMessages(data) {
        if(data.length === 0)
            return

        const messages = data.map((message) => {
            return (message)
        });

        this.setState({
            messageList: messages.concat(this.state.messageList),
            status: LoadingStates.LOADED,
            bottomMessage: messages.slice(-1)[0]
        })
        setTimeout(() => {this.messageEnd.scrollIntoView({ behavior: 'smooth' })}, 600);
    }

    handleLoadHistory(){
        this.props.getMessageList(this.state.topMessage.sentAt, this.state.id, this.handleHistoryMessages);
    }


    handleMessageList(data) {
        let topMessage = null;
        let bottomMessage = null;

        const messages = data.map((message, index) => {
            if(index === 0){
                bottomMessage = message
            }
            topMessage = message;
            return (message)
        });

        if(data.length < 10){
            topMessage = null;
        }

        this.setState({
            messageList: this.state.messageList.concat(messages),
            status: LoadingStates.LOADED,
            topMessage: topMessage,
            bottomMessage: bottomMessage
        })
    }

    handleHistoryMessages(data){
        let topMessage = null;

        const messages = data.map((message) => {
            topMessage = message;
            return (message)
        });

        if(data.length < 10){
            topMessage = null;
        }

        this.setState({
            messageList: this.state.messageList.concat(messages),
            status: LoadingStates.LOADED,
            topMessage: topMessage,
        })
    }


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

    onFormSubmit = () => {
        this.setState({
            submitStatus: true,
        });

        let data = {
            message: this.state.message
        }

        this.props.sendMessage(this.state.id, data, this.handleSendMessage);

    };

    render(){
        if(this.state.status !== LoadingStates.LOADED){
            return (
                <Loader active>
                    Yükleniyor...
                </Loader>
            )
        }

        let width = 16;
        console.log(this.props.auth.id)

        return (
            <Page>
                <Page.Header>
                    <Page.Header.Item>Chat</Page.Header.Item>
                </Page.Header>
                <Page.Content bottomless>
                    <Grid>
                        <Grid.Column width={width}>
                            {
                                this.state.id === 0 ?
                                    <Segment>Mesajları görmek için grup seçiniz.
                                        <div ref={messageEnd => { this.messageEnd = messageEnd; }} />
                                    </Segment>:
                                    <SegmentGroup className={"chat-segments"}>
                                        <Segment className={"chat-header"} color={"red"}>
                                            <Header
                                                content={"Konuşma Listesi"}
                                            />
                                        </Segment>
                                        <Segment secondary className={"chat-container"}>
                                            <ul className={"chat"}>
                                                {this.state.topMessage &&
                                                <Button compact size={"mini"} icon={"angle double up"} content={"Eski Mesajları Yükle"}
                                                        onClick={this.handleLoadHistory}/>
                                                }
                                                {
                                                    this.state.messageList.reverse().map((message) =>
                                                        <Message
                                                            right={message.sender.username === this.props.auth.username}
                                                            user={message.sender.name}
                                                            time={message.sentAt}
                                                            message={message.message}
                                                        />
                                                    )
                                                }
                                                <div ref={messageEnd => { this.messageEnd = messageEnd; }} />
                                            </ul>
                                        </Segment>
                                        <Segment>
                                            <Form onSubmit={this.onFormSubmit}>
                                                <Form.Group widths={"equal"}>
                                                    <Form.Input id={"message"}
                                                                placeholder='Yeni Mesaj'
                                                                value={this.state.message}
                                                                onChange={this.handleInputChange}
                                                                action={{
                                                                    color: 'teal',
                                                                    icon: 'send',
                                                                }}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Segment>
                                    </SegmentGroup>
                            }

                        </Grid.Column>
                    </Grid>
                </Page.Content>
            </Page>
        )
    }



}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendMessage: (id, data, callback) => {
            dispatch(sendMessageAction(id, data, callback));
        },
        getMessageList: (date, id, callback) => {
            dispatch(messageListAction(date, id, callback));
        },
        getSubClubChatNew: (date, id, callback) => {
            dispatch(loadNewAction(date, id, callback));
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubClubChat));