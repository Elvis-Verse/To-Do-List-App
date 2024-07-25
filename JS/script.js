import TodoItem from './todoitem.js';
import TodoList from './todolist.js';

//DOM grabs
const userInput = document.querySelector('#addlistinput');
// Quick entry field styling
userInput.style.fontSize = '1.5rem';

//Continue with DOM grabs
const addBtn = document.querySelector('.additem-btn');
const clearBtn = document.querySelector('.clearlist-btn');
let listItem = document.querySelector('.listdisplay__item');

//Declare new to do list global
const todoList = new TodoList();

//Event Listeners
addBtn.addEventListener('click', () => {
  processSubmission();
});

clearBtn.addEventListener('click', () => {
  const confirmed = confirm(
    'Are you sure you want to clear all items from list?'
  );
  if (confirmed) {
    clearList();
  }
});

document.addEventListener('readystatechange', (event) => {
  if (document.readyState === 'complete') {
    initApp();
  }
});

//Fuctions

const initApp = () => {
  restoreStorage();
  refreshPage();
};
const refreshPage = () => {
  //retrieveStoredData();
  renderList();
  emptyEntryfield();
  setFocusonentryfield();
};

const clearList = () => {
  todoList.clearList();
  listItem.innerHTML = '';
  updatePersistentdata();
};

const renderList = () => {
  listItem.innerHTML = '';

  const list = todoList.getList();
  list.forEach((item) => {
    buildList(item);
  });
};

const buildList = (item) => {
  const li = document.createElement('li');
  const label = document.createElement('label');
  label.classList.add('custom-checkbox');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.tabIndex = '0';
  checkbox.name = 'listcheckbox';
  checkbox.id = item.getId();
  checkbox.classList.add('checkbox');
  const span = document.createElement('span');
  span.classList.add('span');
  addClickListenerToCheckbox(checkbox);
  const newItem = document.createElement('p');
  newItem.id = item.getId();
  newItem.textContent = item.getItem();

  label.append(checkbox, span);
  li.append(label, newItem);
  listItem.appendChild(li);
};

const addClickListenerToCheckbox = (check) => {
  check.addEventListener('change', () => {
    todoList.removeItemfromlist(check.id);
    updatePersistentdata();

    setTimeout(() => {
      listItem.textContent = '';
      renderList();
    }, 1000);
  });
};

const emptyEntryfield = () => {
  userInput.value = '';
};

const setFocusonentryfield = () => {
  userInput.focus();
};

const processSubmission = () => {
  const newItemname = userInput.value.trim();
  if (!newItemname) {
    alert('You have not entered a valid entry');
    return;
  }

  const newItemid = calcNewitemid();
  const todoItem = createNewtodoitem(newItemname, newItemid);
  todoList.addTolist(todoItem);
  updatePersistentdata();

  refreshPage();
};

const calcNewitemid = () => {
  let itemId = 0;
  const list = todoList.getList();
  if (list.length > 0) {
    itemId = list[list.length - 1].getId() + 1;
  }
  return itemId;
};

const createNewtodoitem = (newItemname, newItemid) => {
  const newItem = new TodoItem();
  newItem.setItem(newItemname);
  newItem.setId(newItemid);
  return newItem;
};

const updatePersistentdata = () => {
  const list = todoList.getList();
  localStorage.setItem('myList', JSON.stringify(list));
};

const restoreStorage = () => {
  const storedList = localStorage.getItem('myList');
  if (storedList) {
    const retrievedList = JSON.parse(storedList);

    retrievedList.forEach((itemObj) => {
      const newItem = createNewtodoitem(itemObj._item, itemObj._id);
      todoList.addTolist(newItem);
    });
  }
};
