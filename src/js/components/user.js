import Group from './group';

let userIdCount = 0;

export default class User {
  constructor(options) {
    if (typeof options === 'undefined') return;

    const { name, groupId = 0 } = options;

    this.element = document.createElement('li');
    this.element.dataset.uid = userIdCount++;
    this.element.textContent = name;
    this.element.draggable = true;

    this.element.ondragstart = (event) => {
      event.stopPropagation();
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.dropEffect = 'copy';
      document.querySelector('body').classList.add('user-dragging');
    };

    this.element.ondragend = () => {
      document.querySelector('body').classList.remove('user-dragging');
    };

    const groupElement = document.querySelector(`.group[data-id="${groupId}"]`);
    let group = null;

    if (groupElement === null) {
      group = new Group({ name: 'New Group' });
    } else {
      group = new Group({ groupElement });
    }

    group.addUser(this.element);
  }

  removeUser(uid) {
    const users = Array.from(document.querySelectorAll(`[data-uid="${uid}"]`));

    users.forEach((user) => user.remove());
  }

  get id() {
    return this.element.dataset.uid;
  }
}
