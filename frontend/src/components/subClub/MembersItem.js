import React, {Component} from 'react';
import {Image, List} from 'semantic-ui-react';

import '../../static/css/common/Application.css'


class MembersItem extends Component{

  render(){

    const {member} = this.props;
    return(
      <List.Item>
        <br/>
        {/*<List.Content floated='right'>*/}
        {/*  <Button>Add</Button>*/}
        {/*</List.Content>*/}
        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
        <List.Content>{member.name}</List.Content><br/>
        <br/>
      </List.Item>
    )
  }
}
export default MembersItem;