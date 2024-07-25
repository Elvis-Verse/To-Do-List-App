import TodoItem from './todoitem.js';
export default class TodoList {
  constructor() {
    this.list = [];
  }

  getList() {
    return this.list;
  }
  setList(list) {
    this.list = list;
  }

  addTolist(itemObj) {
    this.list.push(itemObj);
  }

  clearList() {
    this.list = [];
  }

  removeItemfromlist(id) {
    const list = this.list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].getId() == id) {
        list.splice(i, 1);
        break;
      }
    }
  }
}
