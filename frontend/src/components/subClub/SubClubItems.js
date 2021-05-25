import React, {Component} from 'react';
import { Button, Icon, Table, Card, Image } from 'semantic-ui-react';

import defaultClub from '../../static/image/common/subclub.jpg';
import '../../static/css/common/Application.css'
import { Link } from 'react-router-dom';


class SubClubsItem extends Component{

    state = {
        photo: null
    }

    loadImage() {
        const {subClub} = this.props;

        if(subClub.photoFileName !== null){
            if (typeof(subClub.photoFileName) !== 'undefined'){
                import(`../../static/image/common/${subClub.photoFileName}`)
                    .then(image => {
                        this.setState({ photo: image.default })
                    })
            }

        }
    }

    componentDidMount() {
        this.loadImage()
    }


    render(){

        const {subClub} = this.props;

        return(
            <Card style={{"word-wrap": "break-word"}}>
                {subClub.photoFileName ?
                    <Image centered src={this.state.photo}/>: <Image centered src={defaultClub}/>
                }

                <Card.Content>
                    <Card.Header>
                        <Link to={"/sub_club/info/" + subClub.id}>
                            {subClub.name}
                        </Link>
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>{subClub.category.name}</span>
                    </Card.Meta>
                    <Card.Description style={{fontWeight: "bold"}}>
                        {subClub.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <h5>
                        <Icon name='user' />
                        {subClub.members.length} Member
                    </h5>
                </Card.Content>
            </Card>
        )
    }
}

export default SubClubsItem;
