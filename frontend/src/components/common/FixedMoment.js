import React from "react";
import Moment from "react-moment";
import {DATE_FORMAT, DATETIME_FORMAT} from "../../constants/common/date";


export const DateTimeMoment = (props) => {
    return (
        <Moment format={DATETIME_FORMAT} {...props} />
    )
};

export const DateMoment = (props) => {
    return (
        <Moment format={DATE_FORMAT} {...props} />
    )
};



