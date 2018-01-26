import { observable, action } from 'mobx';
import * as firebase from 'firebase';
import autobind from 'autobind-decorator';

const config = {
  apiKey: 'AIzaSyD4Ywl6RRaFrSy8ZXL10hsSl6orA2PF5hc',
  databaseURL: 'https://mobx-ts-todo.firebaseio.com',
  projectId: 'mobx-ts-todo'
};
firebase.initializeApp(config);
const db: firebase.database.Database = firebase.database();

export class TodoStore {
  @observable todos: { id: string; text: string }[] = [];
  constructor() {
    const ref = db.ref();
    ref.child('todos').on(
      'value',
      action((snapshot: firebase.database.DataSnapshot) => {
        if (snapshot) {
          const list = snapshot.val();
          const todos = [];
          if (list !== null) {
            for (const key of Object.keys(list)) {
              todos.push({
                id: key,
                text: list[key]
              });
            }
          }
          this.todos = todos;
        }
      })
    );
  }
  @autobind
  @action
  addTodo(text: string) {
    const ref = db.ref();
    ref
      .child('todos')
      .push()
      .set(text);
  }
  @autobind
  @action
  deleteTodo(id: string) {
    const ref = db.ref();
    ref
      .child('todos')
      .child(id)
      .remove();
  }
}

export default new TodoStore();
