import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          hideCompleted: false,
        };
    }

    toggleHideCompleted() {
        this.setState ({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderTasks() {
        let filteredTask = this.props.tasks;
        if (this.state.hideCompleted) {
           filteredTask = filteredTask.filter(task => !task.checked);

        }
        return filteredTask.map((task) => (
            <Task key={task._id} task={task}/>
        ));
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <header>
                        <h1>Todo List ({this.props.incompleteCount})</h1>

                        <label className="hide-completed">
                            <input
                                type="checkbox"
                                readOnly
                                checked={this.state.hideCompleted}
                                onClick={this.toggleHideCompleted.bind(this)}
                            />
                            Hide Completed Tasks
                        </label>

                        <AccountsUIWrapper/>

                        { this.props.currentUser ?
                            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                                <input
                                    type="text"
                                    ref="textInput"
                                    placeholder="Type to add new tasks"
                                />
                            </form> : ''
                        }
                    </header>
                </div>

                <div className="row justify-content-md-center">
                    <ul className="">
                        {this.renderTasks()}
                    </ul>
                </div>

            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(App);

// export default withTracker(() => {
//     return {
//         tasks: Tasks.find({}).fetch(),
//     };
// })(App);