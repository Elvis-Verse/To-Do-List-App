export default class TodoItem {
  constructor() {
    this._item = null;
    this._id = null;
  }

  getItem() {
    return this._item;
  }

  setItem(newItem) {
    this._item = newItem;
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }
}
