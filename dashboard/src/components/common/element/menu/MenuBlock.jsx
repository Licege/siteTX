import React, { Component } from 'react'
import { Card, CardGroup } from 'react-bootstrap'

class MenuBlock extends Component {
    constructor( props, context ) {
        super(props, context)

        this.state = {
            activeKey: '1',
        }

        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect( activeKey ) {
        this.setState({ activeKey })
    }

    render() {
        return (
            <CardGroup
                accordion
                id="accordion-controlled-example"
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect}
            >
                <Card eventKey="1">
                    <Card.Heading>
                        <Card.Title toggle>Panel heading 1</Card.Title>
                    </Card.Heading>
                    <Card.Body collapsible>Panel content 1</Card.Body>
                </Card>
                <Card eventKey="2">
                    <Card.Heading>
                        <Card.Title toggle>Panel heading 2</Card.Title>
                    </Card.Heading>
                    <Card.Body collapsible>Panel content 2</Card.Body>
                </Card>
            </CardGroup>
        )
    }
}

export default MenuBlock
