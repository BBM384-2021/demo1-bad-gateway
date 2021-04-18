import React, {Component} from "react"
import {Button, Icon, Table} from "semantic-ui-react";


class Pagination extends Component{

    render() {
        return(
            <Table className={"pagination"}>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>

                            <Button //disabled={isPrevDisabled}
                                icon
                                labelPosition='left'
                                size={"small"}
                                compact
                                fluid
                                onClick={this.props.prev}>
                                <Icon name='left arrow' />
                                Önceki
                            </Button>
                        </Table.Cell>
                        <Table.Cell collapsing className={"center aligned"}>
                            {`${this.props.pagination.page+1}/${this.props.pagination.totalPages}`}
                        </Table.Cell>
                        <Table.Cell>
                            <Button //disabled={isNextDisabled}
                                icon
                                labelPosition='right'
                                size={"small"}
                                compact
                                fluid
                                onClick={this.props.next}>
                                <Icon name='right arrow' />
                                Sonraki
                            </Button>

                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        )
    }
}

export default Pagination;