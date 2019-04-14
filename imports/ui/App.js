import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
// import { Meteor } from 'meteor/meteor';
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

        Meteor.call('tasks.insert', text);
        // Tasks.insert({
        //     text,
        //     createdAt: new Date(), // current time
        //     owner: Meteor.userId(),           // _id of logged in user
        //     username: Meteor.user().username,  // username of logged in user
        // });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);

        }
        return filteredTasks.map((task) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;

            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
        // return filteredTask.map((task) => (
        //     <Task key={task._id} task={task}/>
        // ));
    }

    render() {
        return (
            <div className="container">
                <div className="row h-100">  {/*justify-content-md-center*/}
                    {/*<header>*/}
                        <div className="col-lg-10 col-md-10 col-sm-12">
                            <h1 className="text-center font-italic">Todo List ({this.props.incompleteCount})</h1>
                        </div>

                        <div className="col-lg-2 col-md-2 col-sm-12 text-center">
                            <AccountsUIWrapper />
                        </div>
                    {/*</header>*/}
                </div>

                <div className="row">
                    <div className="col-lg-11 col-md-10 text-center">
                        <label className="hide-completed">
                            <input
                                className="checkbox_Task"
                                type="checkbox"
                                readOnly
                                checked={this.state.hideCompleted}
                                onClick={this.toggleHideCompleted.bind(this)}
                            />
                            Hide Completed Tasks
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-11 col-md-10 text-center">
                        { this.props.currentUser ?
                            <form className="form-group" onSubmit={this.handleSubmit.bind(this)} >
                                <input
                                    type="text"
                                    ref="textInput"
                                    placeholder="Type to add new tasks"
                                />
                            </form> : ''
                        }
                    </div>
                </div>
                    {/*/header>*/}
                {/*</div>*/}

                <div className="row">
                    <div className=".col-xl-11 col-lg-11 col-md-10 d-flex justify-content-center">
                        <div className="w-75">
                        <ul className="list-group">
                            {this.renderTasks()}
                        </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('tasks');
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