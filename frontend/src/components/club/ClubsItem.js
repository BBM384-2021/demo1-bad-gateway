import React, {Component} from 'react';
import { Button, Icon, Table, Card, Image } from 'semantic-ui-react';
import defaultClub from '../../static/image/common/club.png';
import '../../static/css/common/Application.css'
import { Link } from 'react-router-dom';


class ClubsItem extends Component{

  render(){

    const {club} = this.props;

    return(
      <Card style={{"word-wrap": "break-word"}}>

        <Image src={defaultClub}/>
        <Card.Content>
          <Card.Header>
            <Link to={"/club/info/" + club.id}>
              {club.name}
            </Link>
          </Card.Header>
          <Card.Meta>
            <span className='date'>{club.category.name}</span>
          </Card.Meta>
          <Card.Description>
            {club.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {club.members.length} Member
            </a>
        </Card.Content>
      </Card>
    )
  }
}

export default ClubsItem;
