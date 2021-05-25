import React, {Component} from "react";

import {loadNewAction, sendMessageAction, messageListAction} from "../../api/actions/subclubchat";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Page from "../base/Page";
import {Button, Form, Loader, Segment, Grid, Header, SegmentGroup, Card} from "semantic-ui-react";
import Message from "./Message";
import "../../static/css/common/Chat.css"
import {LoadingStates} from "../../constants/common";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {timeParser} from "../../utils/time";
import * as subClubActions from "../../api/actions/subClub";

/* TODO SUBCLUB TÜM DATASINI ÇEK*/
/* TODO EMOJI BIR DEFA BASINCA KAPANIYOR*/

class SubClubChat extends Component {
    state = {
        message: "",
        id: 0,
        subClub:null,
        submitStatus: false,
        status: LoadingStates.LOADING,
        messageList: [],
        topMessage: null,
        bottomMessage: null,
        showEmojis: false,
    }

    constructor(props) {
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleMessageList = this.handleMessageList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoadHistory = this.handleLoadHistory.bind(this);
        this.handleBottomMessages = this.handleBottomMessages.bind(this);
        this.handleHistoryMessages = this.handleHistoryMessages.bind(this);
        this.handleSubClubInfo = this.handleSubClubInfo.bind(this);
    }

    handleSubClubInfo(data) {
        this.setState({
                subClub: data
            }
        )
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.setState({
            id: id
        })

        this.props.getSubClubInfo(id, this.handleSubClubInfo);
        this.props.getMessageList(null, id, this.handleMessageList);

        this.interval = setInterval(this.loadNew, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSendMessage(){
        this.setState({
            message: "",
            showEmojis: false
        });
    }

    loadNew = (event) => {
        if(this.state.id !== 0){
            if(this.state.messageList !== null && this.state.messageList.length !== 0){
                this.props.getSubClubChatNew(this.state.messageList[0].sentAt, this.state.id, this.handleBottomMessages);
            }
            else if((this.state.messageList === null || this.state.messageList.length === 0) && this.state.message !== null){
                this.props.getSubClubChatNew(new Date("2021-01-03").toISOString(), this.state.id, this.handleBottomMessages);
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
        let message;
        if(data.response){
            if (data.response.data.status === 404) {
                message = "Please enter a valid email address.";
                return;
            }
            else if (data.response.data.status === 500) {
                message = "This username and email exists.";
                return;
            }
        }
        else{
            message = data.message;
        }
        this.setState({
            isHidden: false,
            messageHeader: "",
            messageForm: message,
            isSuccess: false,
            isError: true,
        })
        
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


        setTimeout(() => {this.messageEnd.scrollIntoView({ behavior: 'smooth' })}, 600);
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

    addEmoji = e => {
        let emoji = e.native;
        this.setState({
            message: this.state.message + emoji
        });
    };

    handleEmojis = e => {
        if(this.state.showEmojis){
            this.setState(
                {
                    showEmojis: false
                },
                //() => document.addEventListener("click", this.closeMenu)
            );
        }else{
            this.setState(
                {
                    showEmojis: true
                },
                //() => document.addEventListener("click", this.closeMenu)
            );
        }


    };

    closeMenu = e => {
        if (this.emojiPicker !== null && this.emojiPicker.contains(e.target)) {
            this.setState(
                {
                    showEmojis: false
                },
                () => document.removeEventListener("click", this.closeMenu)
            );
        }
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

    onFormSubmit = (e) => {
        e.preventDefault()
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

        return (
            <Page>
                {/*<Page.Header>*/}
                {/*    <Page.Header.Item>Chat</Page.Header.Item>*/}
                {/*</Page.Header>*/}
                <Page.Content bottomless>
                    <Grid>
                        <Grid.Column width={width}>
                            {
                                this.state.id === 0 ?
                                    <Segment>Select a group
                                        <div ref={messageEnd => { this.messageEnd = messageEnd; }} />
                                    </Segment>:
                                    <SegmentGroup className={"chat-segments"}>
                                        <Segment className={"chat-header"}>
                                            <Header
                                                content={"Chat"}
                                            />
                                        </Segment>
                                        <Segment className={"chat-container"}>
                                            <ul className={"chat"}>
                                                {this.state.topMessage &&
                                                <Button compact size={"mini"} icon={"angle double up"} content={"Load More"}
                                                        onClick={this.handleLoadHistory}/>
                                                }
                                                {
                                                    this.state.messageList.reverse().map((message) =>
                                                        <Message
                                                            right={message.sender.username === this.props.auth.username}
                                                            user={message.sender.name}
                                                            time={timeParser(message.sentAt)}
                                                            message={message.message}
                                                        />
                                                    )
                                                }
                                                <div ref={messageEnd => { this.messageEnd = messageEnd; }} />
                                            </ul>
                                        </Segment>
                                        <Segment>
                                            <div style={styles.container} className="newMessageForm">
                                                <form style={styles.form} onSubmit={this.onFormSubmit}>
                                                    <input
                                                        id = {"message"}
                                                        style={styles.input}
                                                        type="text"
                                                        value={this.state.message}
                                                        onChange={this.handleInputChange}
                                                        placeholder="Type a message and hit ENTER"
                                                    />
                                                    {this.state.showEmojis ? (
                                                        <React.Fragment>
                                                    <span style={styles.emojiPicker} ref={el => (this.emojiPicker = el)}>
                                                        <Picker
                                                            onSelect={this.addEmoji}
                                                            emojiTooltip={true}
                                                            title="SpiritsUp"
                                                        />
                                                      </span>
                                                            <p style={styles.getEmojiButton} onClick={this.handleEmojis}>
                                                                {String.fromCodePoint(0x1f60a)}
                                                            </p>
                                                        </React.Fragment>
                                                    ) : (
                                                        <p style={styles.getEmojiButton} onClick={this.handleEmojis}>
                                                            {String.fromCodePoint(0x1f60a)}
                                                        </p>
                                                    )}
                                                    <Button icon={"send"} color={'gray'} onClick={this.onFormSubmit}/>
                                                </form>
                                            </div>
                                        </Segment>
                                    </SegmentGroup>
                            }

                        </Grid.Column>
                       {/* {this.state.subClub ?
                            <Grid.Column width={3}>
                                <div style={{marginTop: "10px"}}>
                                    <SubClubItems
                                        key={this.state.subClub.id}
                                        subClub={this.state.subClub}
                                    />
                                </div>
                                <SubClubFeed></SubClubFeed>
                            </Grid.Column>:
                            ""
                        }*/}

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
        },
        getSubClubInfo: (id, callback) => {
            dispatch(subClubActions.subClubInfoAction(id, callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubClubChat));

const styles = {
    container: {
        padding: 20,
        borderTop: "1px #4C758F solid",
        marginBottom: 20
    },
    form: {
        display: "flex"
    },
    input: {
        color: "inherit",
        background: "none",
        outline: "none",
        border: "none",
        flex: 1,
        fontSize: 16
    },
    getEmojiButton: {
        cssFloat: "right",
        border: "none",
        margin: 0,
        cursor: "pointer",
        size: "50px"
    },
    emojiPicker: {
        position: "absolute",
        bottom: 100,
        right: 0,
        cssFloat: "right",
        marginLeft: "200px"
    }
};

const customEmojis = [
    {
        name: "Octocat",
        short_names: ["octocat"],
        text: "",
        emoticons: [],
        keywords: ["github"],
        imageUrl: "https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7"
    }
];
