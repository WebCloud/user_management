import User from './user';

const template = `
<span>$name</span>
<ul class="user-list"></ul>
<div class="group-actions">
  <div class="action add-user">Add user</div>
  <div class="action remove-from-group">Remove from group</div>
</div>
`;

let groupIdCount = 0;

export default class Group {
  constructor(options) {
    if (typeof options === 'undefined') return;

    const { name, groupElement } = options;

    if (typeof groupElement === 'undefined') {
      this.element = document.createElement('div');
      this.element.className = 'group dropzone';
      this.element.dataset.id = groupIdCount++;
      this.element.innerHTML = template.replace('$name', name);
    } else {
      this.element = groupElement;
    }

    this.element.querySelector('.action.add-user').onclick = () => new User({
      name: window.prompt('Enter user name'),
      groupId: this.id
    });

    const removeFromGroup = this.element.querySelector('.action.remove-from-group');

    removeFromGroup.ondragover = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      removeFromGroup.classList.add('dropzone--remove');
    };

    removeFromGroup.ondragleave = (event) => {
      event.preventDefault();
      removeFromGroup.classList.remove('dropzone--remove');
    };

    removeFromGroup.ondrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const uid = event.dataTransfer.getData('text');
      const userElement = document.querySelector(`[data-uid="${uid}"]`);
      this.removeUser(userElement);
      removeFromGroup.classList.remove('dropzone--remove');
      return false;
    };

    this.element.ondragover = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      this.element.classList.add('dropzone--add');
    };

    this.element.ondragleave = (event) => {
      event.preventDefault();
      this.element.classList.remove('dropzone--add');
    };

    this.element.ondrop = (event) => {
      event.preventDefault();
      const uid = event.dataTransfer.getData('text');
      const userElement = document.querySelector(`[data-uid="${uid}"]`);
      new User({ id: uid, name: userElement.textContent, groupId: this.id });

      this.element.classList.remove('dropzone--add');
      return false;
    };

    this.element.draggable = true;

    this.element.ondragstart = (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.dropEffect = 'move';
      document.querySelector('body').classList.add('group-dragging');
    };

    this.element.ondragend = () => {
      document.querySelector('body').classList.remove('group-dragging');
    };

    this.userList = this.element.querySelector('.user-list');
  }

  addUser(userElement) {
    const canAdd = !this.userList.querySelector(`li[data-uid="${userElement.dataset.uid}"]`);

    if (canAdd) {
      this.userList.appendChild(userElement);
    } else {
      window.console.error(`Already has user: ${userElement.textContent}`);
    }
  }

  removeUser(userElement) {
    this.userList.removeChild(userElement);
  }

  removeGroup(id) {
    const group = document.querySelector(`.group[data-id="${id}"]`);
    const userList = group.querySelector('.user-list');
    if (!userList.childNodes.length) {
      group.remove();
    } else {
      window.console.warn('You cannot remove a group that contains users.');
    }
  }

  render() {
    const groupList = document.querySelector('.groups');
    groupList.appendChild(this.element);
  }

  get id() {
    return this.element.dataset.id;
  }
}
