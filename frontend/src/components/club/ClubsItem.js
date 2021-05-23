import React, {Component} from 'react';
import {Button, Icon, Table, Card, Image} from 'semantic-ui-react';

import defaultClub from '../../static/image/common/club.png';
import '../../static/css/common/Application.css'
import {Link} from 'react-router-dom';


class ClubsItem extends Component{

    state = {
        photo: null
    }

    loadImage() {
        const {club} = this.props;
        // if(club.photoFileName !== null){
        //     import(`../../static/image/common/${club.photoFileName}`)
        //         .then(image => {
        //             this.setState({ photo: image.default })
        //         })
        // }

    }

    componentDidMount() {
        this.loadImage()
    }


  render(){

      const {club, isSubClub} = this.props;

    return(
      <Card style={{"word-wrap": "break-word"}}>

          {club.photoFileName ?
              <Image src={this.state.photo}/>: <Image src={defaultClub}/>
          }
          <Card.Content>
              <Card.Header>
                  {isSubClub ?

                      <Link to={"/sub_club/info/" + club.id}>
                          {club.name}
                      </Link> : <Link to={"/club/info/" + club.id}>
                          {club.name}
                      </Link>
                  }
              </Card.Header>
              <Card.Meta>
                  {isSubClub ?
                      <div>
                          <span className='date'>by {club.parentClub}</span>
                          <br/>
                          <span className='date'>{club.category}</span>
                      </div> :
                      <span className='date'>{club.category.name}</span>
                  }

              </Card.Meta>
              <Card.Description style={{fontWeight: "bold"}}>
                  {club.description}
              </Card.Description>
          </Card.Content>
          <Card.Content extra>
              <a>
                  <Icon name='user'/>
                  {club.members.length} Member
              </a>
          </Card.Content>
      </Card>
    )
  }
}

export default ClubsItem;
