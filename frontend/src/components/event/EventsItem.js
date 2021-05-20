import React, {Component} from 'react';
import {Button, Icon, Table, Card, Image} from 'semantic-ui-react';
import '../../static/css/common/Application.css'
import {Link} from 'react-router-dom';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';


class EventsItem extends Component {

    render() {

        const {event} = this.props;

        //let eventDate = event.eventDate.toISOString();

        return (
            <Card style={{"word-wrap": "break-word"}} color="orange">

                <Card.Content>
                    <Card.Header>
                        <Link to={"/event/info/" + event.id}>
                            {event.name}
                        </Link>
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>{event.club.name}</span>
                    </Card.Meta>
                    {event.subClub !== null &&
                        <Card.Description style={{fontWeight: "bold"}}>
                            Event Type : {event.eventType}<br/>
                            Event Address : {event.address}<br/>
                            Event Date : {event.eventDate} <br/>
                            Sub Club : {event.subClub.name} <br/>
                        </Card.Description>
                    }
                    {event.subClub === null &&
                        <Card.Description style={{fontWeight: "bold"}}>
                            Event Type : {event.eventType}<br/>
                            Event Address : {event.address}<br/>
                            Event Date : {event.eventDate} <br/>
                        </Card.Description>
                    }

                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        {event.attendees.length} Attendees
                    </a>
                    <Button size={"tiny"} compact={"true"} style={{marginLeft: "200px"}}>
                        Attend
                    </Button>
                </Card.Content>
            </Card>


        )
    }
}

export default EventsItem;