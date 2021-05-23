import React, {Component} from 'react';
import { Button, Icon, Table, Card, Image } from 'semantic-ui-react';

import defaultClub from '../../static/image/common/subclub.jpg';
import '../../static/css/common/Application.css'
import { Link } from 'react-router-dom';
import Header from '../common/Header';


class ClubRequestItems extends Component{

  render(){

    const {clubRequest} = this.props;

    return(
      <Table.Row>
        <Table.Cell>{clubRequest.clubName}</Table.Cell>
        <Table.Cell>{clubRequest.requestCount}</Table.Cell>
        <Table.Cell>
          {
            clubRequest.requestCount >= 3 ?
              <Button color='green' as={Link} to={"/club/create"}>Create Club</Button>
              :
              <Button color='red' disabled>Create Club</Button>
          }
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default ClubRequestItems;