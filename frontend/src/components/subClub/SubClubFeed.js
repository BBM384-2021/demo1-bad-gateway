import React from 'react'
import {Card, Feed, Image} from 'semantic-ui-react'
import defaultPhoto from '../../static/image/common/jenny.jpeg';

const CardExampleContentBlock = () => (
    <Card>
        <Card.Content>
            <Card.Header>Activity</Card.Header>
        </Card.Content>
        <Card.Content>
            <Feed>
                <Feed.Event>
                    <Feed.Label>
                        <Image centered src={defaultPhoto}/>
                    </Feed.Label>

                    <Feed.Content>
                        <Feed.Date content='1 day ago' />
                        <Feed.Summary>
                            Drawing session on May 16
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label>
                        <Image centered src={defaultPhoto}/>
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Date content='3 days ago' />
                        <Feed.Summary>
                            Molly Malone joined to club
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                    <Feed.Label>
                        <Image centered src={defaultPhoto}/>
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Date content='4 days ago' />
                        <Feed.Summary>
                            Elliot Baker joined to club
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
            </Feed>
        </Card.Content>
    </Card>
)

export default CardExampleContentBlock
