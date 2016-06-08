/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _group = __webpack_require__(5);
	
	var _group2 = _interopRequireDefault(_group);
	
	var _user = __webpack_require__(6);
	
	var _user2 = _interopRequireDefault(_user);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.querySelector('.add-group').onclick = function () {
	  var group = new _group2.default({ name: window.prompt('Enter group name') });
	  group.render();
	};
	
	var removeUser = document.querySelector('.remove-user');
	removeUser.ondragover = function (event) {
	  event.preventDefault();
	  event.dataTransfer.dropEffect = 'move';
	  removeUser.classList.add('dropzone--remove');
	};
	
	removeUser.ondragleave = function (event) {
	  event.preventDefault();
	  removeUser.classList.remove('dropzone--remove');
	};
	
	removeUser.ondrop = function (event) {
	  event.preventDefault();
	  var uid = event.dataTransfer.getData('text');
	  new _user2.default().removeUser(uid);
	  removeUser.classList.remove('dropzone--remove');
	};
	
	var removeGroup = document.querySelector('.remove-group');
	removeGroup.ondragover = function (event) {
	  event.preventDefault();
	  event.dataTransfer.dropEffect = 'move';
	  removeGroup.classList.add('dropzone--remove');
	};
	
	removeGroup.ondragleave = function (event) {
	  event.preventDefault();
	  removeGroup.classList.remove('dropzone--remove');
	};
	
	removeGroup.ondrop = function (event) {
	  event.preventDefault();
	  var id = event.dataTransfer.getData('text');
	  new _group2.default().removeGroup(id);
	  removeGroup.classList.remove('dropzone--remove');
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _user = __webpack_require__(6);
	
	var _user2 = _interopRequireDefault(_user);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = '\n<span>$name</span>\n<ul class="user-list"></ul>\n<div class="group-actions">\n  <div class="action add-user">Add user</div>\n  <div class="action remove-from-group">Remove from group</div>\n</div>\n';
	
	var groupIdCount = 0;
	
	var Group = function () {
	  function Group(options) {
	    var _this = this;
	
	    _classCallCheck(this, Group);
	
	    if (typeof options === 'undefined') return;
	
	    var name = options.name;
	    var groupElement = options.groupElement;
	
	
	    if (typeof groupElement === 'undefined') {
	      this.element = document.createElement('div');
	      this.element.className = 'group dropzone';
	      this.element.dataset.id = groupIdCount++;
	      this.element.innerHTML = template.replace('$name', name);
	    } else {
	      this.element = groupElement;
	    }
	
	    this.element.querySelector('.action.add-user').onclick = function () {
	      return new _user2.default({
	        name: window.prompt('Enter user name'),
	        groupId: _this.id
	      });
	    };
	
	    var removeFromGroup = this.element.querySelector('.action.remove-from-group');
	
	    removeFromGroup.ondragover = function (event) {
	      event.preventDefault();
	      event.dataTransfer.dropEffect = 'move';
	      removeFromGroup.classList.add('dropzone--remove');
	    };
	
	    removeFromGroup.ondragleave = function (event) {
	      event.preventDefault();
	      removeFromGroup.classList.remove('dropzone--remove');
	    };
	
	    removeFromGroup.ondrop = function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      var uid = event.dataTransfer.getData('text');
	      var userElement = document.querySelector('[data-uid="' + uid + '"]');
	      _this.removeUser(userElement);
	      removeFromGroup.classList.remove('dropzone--remove');
	      return false;
	    };
	
	    this.element.ondragover = function (event) {
	      event.preventDefault();
	      event.dataTransfer.dropEffect = 'copy';
	      _this.element.classList.add('dropzone--add');
	    };
	
	    this.element.ondragleave = function (event) {
	      event.preventDefault();
	      _this.element.classList.remove('dropzone--add');
	    };
	
	    this.element.ondrop = function (event) {
	      event.preventDefault();
	      var uid = event.dataTransfer.getData('text');
	      var userElement = document.querySelector('[data-uid="' + uid + '"]');
	      new _user2.default({ id: uid, name: userElement.textContent, groupId: _this.id });
	
	      _this.element.classList.remove('dropzone--add');
	      return false;
	    };
	
	    this.element.draggable = true;
	
	    this.element.ondragstart = function (event) {
	      event.dataTransfer.setData('text/plain', _this.id);
	      event.dataTransfer.dropEffect = 'move';
	      document.querySelector('body').classList.add('group-dragging');
	    };
	
	    this.element.ondragend = function () {
	      document.querySelector('body').classList.remove('group-dragging');
	    };
	
	    this.userList = this.element.querySelector('.user-list');
	  }
	
	  _createClass(Group, [{
	    key: 'addUser',
	    value: function addUser(userElement) {
	      var canAdd = !this.userList.querySelector('li[data-uid="' + userElement.dataset.uid + '"]');
	
	      if (canAdd) {
	        this.userList.appendChild(userElement);
	      } else {
	        window.console.error('Already has user: ' + userElement.textContent);
	      }
	    }
	  }, {
	    key: 'removeUser',
	    value: function removeUser(userElement) {
	      this.userList.removeChild(userElement);
	    }
	  }, {
	    key: 'removeGroup',
	    value: function removeGroup(id) {
	      var group = document.querySelector('.group[data-id="' + id + '"]');
	      var userList = group.querySelector('.user-list');
	      if (!userList.childNodes.length) {
	        group.remove();
	      } else {
	        window.console.warn('You cannot remove a group that contains users.');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var groupList = document.querySelector('.groups');
	      groupList.appendChild(this.element);
	    }
	  }, {
	    key: 'id',
	    get: function get() {
	      return this.element.dataset.id;
	    }
	  }]);
	
	  return Group;
	}();
	
	exports.default = Group;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _group = __webpack_require__(5);
	
	var _group2 = _interopRequireDefault(_group);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var userIdCount = 0;
	
	var User = function () {
	  function User(options) {
	    var _this = this;
	
	    _classCallCheck(this, User);
	
	    if (typeof options === 'undefined') return;
	
	    var id = options.id;
	    var name = options.name;
	    var _options$groupId = options.groupId;
	    var groupId = _options$groupId === undefined ? 0 : _options$groupId;
	
	
	    this.element = document.createElement('li');
	    this.element.dataset.uid = id || userIdCount++;
	    this.element.textContent = name;
	    this.element.draggable = true;
	
	    this.element.ondragstart = function (event) {
	      event.stopPropagation();
	      event.dataTransfer.setData('text/plain', _this.id);
	      event.dataTransfer.dropEffect = 'copy';
	      document.querySelector('body').classList.add('user-dragging');
	    };
	
	    this.element.ondragend = function () {
	      document.querySelector('body').classList.remove('user-dragging');
	    };
	
	    var groupElement = document.querySelector('.group[data-id="' + groupId + '"]');
	    var group = null;
	
	    if (groupElement === null) {
	      group = new _group2.default({ name: 'New Group' });
	    } else {
	      group = new _group2.default({ groupElement: groupElement });
	    }
	
	    group.addUser(this.element);
	  }
	
	  _createClass(User, [{
	    key: 'removeUser',
	    value: function removeUser(uid) {
	      var users = Array.from(document.querySelectorAll('[data-uid="' + uid + '"]'));
	
	      users.forEach(function (user) {
	        return user.remove();
	      });
	    }
	  }, {
	    key: 'id',
	    get: function get() {
	      return this.element.dataset.uid;
	    }
	  }]);
	
	  return User;
	}();
	
	exports.default = User;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map