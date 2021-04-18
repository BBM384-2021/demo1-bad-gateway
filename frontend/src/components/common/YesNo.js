import React from 'react';
import {Label} from "semantic-ui-react";

const YesNo = (props) => {
    const {value} = props;
    let color = "";
    let content = "";

    if(value){
        color = "green"
        content = "EVET"
    }else{
        color = "red"
        content = "HAYIR"
    }

    return(
        <Label size={"mini"} color={color}>{content}</Label>
    )

}

export default YesNo;