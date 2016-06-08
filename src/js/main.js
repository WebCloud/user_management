import '../styles/main.scss';
import Group from './components/group';
import User from './components/user';

document.querySelector('.add-group').onclick = () => {
  const group = new Group({ name: window.prompt('Enter group name') });
  group.render();
};

const removeUser = document.querySelector('.remove-user');
removeUser.ondragover = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  removeUser.classList.add('dropzone--remove');
};

removeUser.ondragleave = (event) => {
  event.preventDefault();
  removeUser.classList.remove('dropzone--remove');
};

removeUser.ondrop = (event) => {
  event.preventDefault();
  const uid = event.dataTransfer.getData('text');
  new User().removeUser(uid);
  removeUser.classList.remove('dropzone--remove');
};

const removeGroup = document.querySelector('.remove-group');
removeGroup.ondragover = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  removeGroup.classList.add('dropzone--remove');
};

removeGroup.ondragleave = (event) => {
  event.preventDefault();
  removeGroup.classList.remove('dropzone--remove');
};

removeGroup.ondrop = (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text');
  new Group().removeGroup(id);
  removeGroup.classList.remove('dropzone--remove');
};
