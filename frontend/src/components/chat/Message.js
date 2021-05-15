import React from "react";

import {Message as SMessage} from "semantic-ui-react";
import Moment from "react-moment";


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
                <b>{user}</b> : <Moment fromNow>{time}</Moment><br/>
                <SMessage size={"large"} color={color}>{message}</SMessage>
            </div>
        </li>
    )
};

export default Message