import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import { TodoStore } from '../stores/todoStore';

interface TodoProps {
  todoStore?: TodoStore;
}

@inject('todoStore')
@observer
class Todo extends React.Component<TodoProps, {}> {
  render() {
    const todoStore = this.props.todoStore as TodoStore;
    return (
      <div className="App">
        <TodoInput addTodo={todoStore.addTodo} />
        <TodoList todos={todoStore.todos} deleteTodo={todoStore.deleteTodo} />
      </div>
    );
  }
}

export default Todo;
