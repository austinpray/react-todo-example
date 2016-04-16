import React, {Component} from "react";
import ReactDom from "react-dom";

class TodoListItem extends Component {
    render() {
        const {content, id, toggleFn, done} = this.props;
        return <div className="list-group-item">
            <button className="btn btn-default"
                    onClick={() => {
                        toggleFn(id);
                    }}>
                {done ? 'Do' : 'Undo'}
            </button>
            {content}
        </div>
    }
}

class TodoApp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            newTodo: "",
            todos: []
        }
    }
    
    handleChangeTodoText(event) {
        this.setState({
            newTodo: event.target.value
        });
    }
    
    toggleDoneFactory(todoId) {
        return this.toggleDone.bind(this, todoId);
    }
    
    toggleDone(todoId) {
        const todos = this.state.todos.map(function (todo) {
            if (todo.id === todoId) {
                todo.done = !todo.done;
            }
            return todo;
        });
        this.setState({
            todos
        });
    }
    
    saveTodo() {
        this.setState({
            newTodo: '',
            todos: [].concat(
                this.state.todos, 
                [{
                    id: Math.random(),
                    content: this.state.newTodo,
                    done: false
                }]
            )
        });
    }

    render() {
        const {newTodo, todos} = this.state;
        return <div className="panel panel-default">
            <div className="panel-heading">
                Todo
            </div>
            <div className="panel-body">
                <label>Enter Todo</label>
                <input type="text"
                       className="form-control"
                       value={newTodo}
                       onChange={this.handleChangeTodoText.bind(this)} />
                <button className="btn btn-primary"
                        onClick={this.saveTodo.bind(this)}>
                    Save
                </button>
            </div>
            <ul className="list-group">
                {todos.map((todo) => {
                    return <TodoListItem content={todo.content} 
                                         id={todo.id}
                                         done={todo.done}
                                         toggleFn={this.toggleDone.bind(this)} />
                })}
            </ul>
            <div className="panel-body">
                <pre>{JSON.stringify(this.state, null, ' ')}</pre>
            </div>
        </div>
    }
}

ReactDom.render(
    <TodoApp />,
    document.getElementById('app')
);
