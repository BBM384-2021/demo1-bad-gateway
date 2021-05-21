import React, {Component} from "react";

import {listPeopleAction, loadNewAction, sendMessageAction, messageListAction} from "../../api/actions/privateMessage";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Page from "../base/Page";
import {Button, Form, Loader, Segment, Grid, Header, SegmentGroup, Image, Card, Label} from "semantic-ui-react";
import Message from "../chat/Message";
import "../../static/css/common/Chat.css"
import {LoadingStates} from "../../constants/common";
import {timeParser} from "../../utils/time";
import {Picker} from "emoji-mart";
import defaultPhoto from '../../static/image/common/jenny.jpeg';

/* TODO WRITE CSS IN COMMON FILE */

class PrivateMessage extends Component {
    state = {
        message: "",
        receiverId: 0,
        receiver: null,
        submitStatus: false,
        status: LoadingStates.LOADING,
        messageList: [],
        topMessage: null,
        bottomMessage: null,
        people: [],
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
        this.handlePeopleList = this.handlePeopleList.bind(this);
        this.handlePeopleSelect = this.handlePeopleSelect.bind(this);
    }

    componentDidMount(){
        if(this.state.receiverId !== 0){
            this.props.getMessageList(null, this.state.receiverId, this.handleMessageList);
        }

        this.interval = setInterval(this.loadNew, 3000);

        //setTimeout(() => {this.messageEnd.scrollIntoView({ behavior: 'smooth' })}, 600);

        this.props.getPeopleList(this.handlePeopleList);
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
        if(this.state.receiverId !== 0){
            if(this.state.messageList !== null && this.state.messageList.length !== 0){
                console.log(this.state.messageList);
                this.props.getPrivateMessageNew(this.state.messageList[0].sentAt, this.state.receiverId, this.handleBottomMessages);
            }
            else{
                this.props.getPrivateMessageNew(new Date("2999-01-03").toISOString(), this.state.receiverId, this.handleBottomMessages);
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
        this.props.getMessageList(this.state.topMessage.sentAt, this.state.receiverId, this.handleHistoryMessages);
    }

    handlePeopleSelect (person){
        return (event) => {
            this.setState({
                receiverId: person.id,
                receiver: person,
                messageList: []
            });

            this.props.getMessageList(null, person.id, this.handleMessageList);
        }
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

    handlePeopleList(data) {
        console.log(data)
        this.setState({
            people: data,
            status: LoadingStates.LOADED
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

        this.props.sendMessage(this.state.receiverId, data, this.handleSendMessage);

    };

    render(){
        if(this.state.status !== LoadingStates.LOADED){
            return (
                <Loader active>
                    Yükleniyor...
                </Loader>
            )
        }

        let width = 13;

        return (
            <Page>
                <Page.Header>
                    <Page.Header.Item>Private Messages</Page.Header.Item>
                </Page.Header>
                <Page.Content bottomless>
                    <Grid style={{marginTop: "20px"}}>
                        { this.state.people === null || this.state.people.length === 0 ?
                            <Grid.Column width={16}>
                            <Segment>No message
                                <div ref={messageEnd => { this.messageEnd = messageEnd; }} />
                            </Segment>
                            </Grid.Column>:
                            <React.Fragment>
                                <Grid.Column width={3}>
                                    {
                                        this.state.people.map((person) =>
                                            <Label size={'big'} style={styles.button} color='blue' as={'a'} onClick={this.handlePeopleSelect(person)}>
                                                <Image avatar src={defaultPhoto} width={"40px"}/>
                                                &nbsp;&nbsp;&nbsp;
                                                {person.name}
                                            </Label>
                                        )
                                    }

                                </Grid.Column>

                                <Grid.Column width={width}>

                            {
                                this.state.receiverId === 0 ?
                                <Segment>Select a chat.
                                    <div ref={messageEnd => { this.messageEnd = messageEnd; }} />
                                </Segment>:
                                <SegmentGroup className={"chat-segments"}>
                                    <Segment className={"chat-header"}>
                                        <Header
                                        content={this.state.receiver.name}
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
                                    </form>

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
                                        </div>
                                </Segment>
                                </SegmentGroup>
                            }

                                </Grid.Column>
                            </React.Fragment>
                        }

                    </Grid>
                </Page.Content>
            </Page>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendMessage: (receiverId, data, callback) => {
            dispatch(sendMessageAction(receiverId, data, callback));
        },
        getMessageList: (date, receiverId, callback) => {
            dispatch(messageListAction(date, receiverId, callback));
        },
        getPrivateMessageNew: (date, receiverId, callback) => {
            dispatch(loadNewAction(date, receiverId, callback));
        },
        getPeopleList: (callback) => {
            dispatch(listPeopleAction(callback));
        },
    }
};

const mapStateToProps = (state, ownProps) => {
    const {auth} = state;

    return {
        auth
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateMessage));


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
    },
    emojiPicker: {
        position: "absolute",
        bottom: 100,
        right: 0,
        cssFloat: "right",
        marginLeft: "200px"
    },
    button: {
        width: "100%",
        marginBottom: 10
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
