import * as React from 'react';
import { observer } from 'mobx-react';

interface TodoListProps {
  todos: { id: string; text: string }[];
  deleteTodo(id: string): void;
}

@observer
class TodoInput extends React.Component<TodoListProps, {}> {
  render() {
    const list = this.props.todos.map(todo => (
      <li key={todo.id}>
        {todo.text}
        <button onClick={() => this.props.deleteTodo(todo.id)}>삭제</button>
      </li>
    ));
    return (
      <div>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default TodoInput;
