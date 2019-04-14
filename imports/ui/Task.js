import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

// import classnames from 'classnames';
// import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
class Task extends Component {
    toggleChecked() {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
        // Tasks.update( this.props.task._id, {
        //     $set: { checked: !this.props.task.checked },
        // });
    }

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
        // Tasks.remove(this.props.task._id);
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
    }

    render() {
        // const taskClassName = classnames({
        //     checked: this.props.task.checked,
        //     private: this.props.task.private,
        // });
        return (
            <li className= "list-group-item">
                <div className="row">
                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-12 text-sm-center">
                        <button type="button"
                            className="btn btn-outline-danger delete margin_Task"
                            onClick={this.deleteThisTask.bind(this)}>
                                Delete
                        </button>
                    </div>

                    <div className="col-xl-1 col-lg-1 col-md-4 col-sm-12 text-sm-center">
                        <input
                            className="checkbox_Text"
                            type="checkbox"
                            readOnly
                            checked={!!this.props.task.checked}
                            onClick={this.toggleChecked.bind(this)}
                        />
                    </div>

                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12 text-sm-center">
                        { this.props.showPrivateButton ? (
                            <button type="button"
                                    className="btn btn-primary btn-private margin_Task"  //btn-outline-primary
                                    onClick={this.togglePrivate.bind(this)}>
                                        { this.props.task.private ? 'Private' : 'Public' }
                            </button>
                        ) : ''}
                    </div>

                    <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 text-sm-center margin_text_Task">
                        <span>
                            <strong> { this .props.task.username} </strong>: {this.props.task.text}
                        </span>
                        {/*<span className="text">{this.props.task.text}</span>*/}
                    </div>
                </div>
            </li>

        );
    }
}

export default Task
// {/*<li className="list-group-item disabled">{this.props.task.text}</li>*/}
