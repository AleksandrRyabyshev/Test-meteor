import React, { Component } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
    render() {
        return (
            <li className="list-group-item disabled">{this.props.task.text}</li>
        );
    }
}
