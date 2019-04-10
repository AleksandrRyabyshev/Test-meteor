import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date(), // current time
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task}/>
        ));
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <header>
                        <h1>Todo List</h1>

                        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks"
                            />
                        </form>
                    </header>
                </div>

                <div className="row justify-content-md-center">
                    <ul className="">
                        {this.renderTasks()}
                    </ul>

                </div>

                {/*<div className="row justify-content-md-center">*/}
                    {/*<div className="btn-group float-left" role="group">*/}
                        {/*<button type="button" className="btn btn-lg btn-primary">2321</button>*/}
                    {/*</div>*/}
                    {/*<div className="btn-group float-right" role="group">*/}
                        {/*<button type="button" className="btn btn-lg btn-outline-dark">2321</button>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);

// export default withTracker(() => {
//     return {
//         tasks: Tasks.find({}).fetch(),
//     };
// })(App);