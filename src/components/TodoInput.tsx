import * as React from 'react';
import { observer } from 'mobx-react';
import autobind from 'autobind-decorator';

interface TodoInputProps {
  addTodo(text: string): void;
}

@observer
class TodoInput extends React.Component<TodoInputProps, {}> {
  private _input: HTMLInputElement;
  render() {
    return (
      <div>
        <input
          type="text"
          ref={ref => (this._input = ref as HTMLInputElement)}
        />
        <button onClick={this._addTodo}>저장</button>
      </div>
    );
  }
  @autobind
  private _addTodo(): void {
    const input = this._input;
    if (input.value !== '') {
      this.props.addTodo(input.value);
      input.value = '';
    }
  }
}

export default TodoInput;
