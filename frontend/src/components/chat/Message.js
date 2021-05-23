import React from "react";

import {Message as SMessage, Label} from "semantic-ui-react";
import Moment from "react-moment";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";


const Message = (props) => {

    const {user, time, message, me, right} = props;

    let color = "orange";
    let position = "left";

    if(me){
        color = "olive";
    } else if(right) {
        color = "teal";
    }

    if(right) {
        position = "right";
    }

    return (
        <li className={position}>
            <div className={"message-box"} >
                <b>{user}</b> : {time}<br/>
                <Segment inverted color={color}>
                    <text color={"black"}>{message}</text>
                </Segment>
            </div>
        </li>
    )
};

export default Message