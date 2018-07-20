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
		'removeTask': []
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
		tasks[index] = title;
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

	function notify(type, data) {
		handlers[type].forEach(function(el) {
			el(data);
		});
	}
}

function TodoView(model) {
	model.attach('addTask', renderNewTask);

	function renderNewTask(data) {		
		const taskTitle = document.createElement('div');
		taskTitle.textContent = data['title'];
		taskTitle.classList.add('task-title');
		
		const buttonDelete = document.createElement('button');
		buttonDelete.classList.add('button-delete');
		
		const task = document.createElement('div');
		task.id = 'id-' + data['index'];
		task.classList.add('task');
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
}
