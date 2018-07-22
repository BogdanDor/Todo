document.onreadystatechange = function() {
	switch (document.readyState) {
		case 'loading':
			break;
		case 'interactive': 
			break;
		case 'complete': {
			(function complete() {
				const model = new TodoModel();
				const controller = new TodoController(model);
				const view = new TodoView(model);
			})();
			break;
		}
		default:
	}
}

function TodoModel() {
	const handlers = {
		'addTask': [],
		'removeTask': [],
		'changeTask': []
	}
	const tasks = [];

  this.attach = function(type, fn) {
		handlers[type].push(fn);
	}
	
	this.detach = function(type, fn) {
		const index = handlers[type].indexOf(fn);
		if (index != -1) {
			handlers.splice(index, 1);
		}
	}

	this.addTask = function(title) {
	  const index = (new Date()).getTime();
		tasks[index] = {
			title: title,
			isCompleted: false
		}
		const data = {
			index: index,
			title: title
		}
		notify('addTask', data);
	}

	this.removeTask = function(index) {
		tasks.splice(index, 1);
		const data = {
			index: index
		}
		notify('removeTask', data);
	}

	this.setTaskCompleted = function(index, value) {
		const task = tasks[index];
		task['isCompleted'] = value;
		data = {
			index: index,
			title: task['title'],
			isCompleted: value
		}
		notify('changeTask', data);
	}

	function notify(type, data) {
		handlers[type].forEach(function(el) {
			el(data);
		});
	}
}

function TodoView(model) {
	model.attach('addTask', renderNewTask);

	function renderNewTask(data) {		
		const toggle = document.createElement('input');
		toggle.type = 'checkbox';
		toggle.classList.add('toggle');

		const taskTitle = document.createElement('div');
		taskTitle.textContent = data['title'];
		taskTitle.classList.add('task-title');
		
		const buttonDelete = document.createElement('button');
		buttonDelete.classList.add('button-delete');
		
		const task = document.createElement('div');
		task.id = 'id-' + data['index'];
		task.classList.add('task');
		task.appendChild(toggle);
		task.appendChild(taskTitle);
		task.appendChild(buttonDelete);

		const taskList = document.getElementById('task-list');
		taskList.appendChild(task);
		
		let input = document.getElementById('input');
		input.value = '';
	}

	model.attach('removeTask', deleteTask);

	function deleteTask(data) {
		const id = "id-" + data['index'];
		const taskList = document.getElementById('task-list');
		const task = document.getElementById(id);
		taskList.removeChild(task);
	}

	model.attach('changeTask', changeTask);
	
	function changeTask(data) {
		const id = "id-" + data['index'];
		const task = document.getElementById(id);
		const taskTitle = task.getElementsByClassName('task-title')[0];
		if (data['isCompleted']) {
			taskTitle.classList.add('task-completed');
		} else {
			taskTitle.classList.remove('task-completed');
		}		
	}
}

function TodoController(model) {
	let input = document.getElementById('input');
	input.addEventListener('keyup', function(evt) {
		const ENTER_CODE = 13;
		if (evt.keyCode == ENTER_CODE) {
			const text = input.value;
			model.addTask(text);
		}
	});
	const taskList = document.getElementById('task-list');
	taskList.addEventListener('click', function(evt) {
		if (!evt.target.classList.contains('button-delete')) {
			return;
		}
		const id = evt.target.parentElement.id;
		const index = parseInt(id.replace('id-', ''), 10);
		model.removeTask(index);
	});
	taskList.addEventListener('change', function(evt) {
 		if (!evt.target.classList.contains('toggle')) {
 			return
 		}
		const id = evt.target.parentElement.id;
		const index = parseInt(id.replace('id-', ''), 10);
		const isCompleted = evt.target.checked;
		model.setTaskCompleted(index, isCompleted);
	});
}
