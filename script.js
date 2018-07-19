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

	this.addTask = function(task) {
		tasks.push(task);
		const data = {
			task: task
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
		const taskList = document.getElementById('task-list');
		const task = document.createElement('div');
		task.textContent = data['task'];
		task.classList.add('task');
		taskList.appendChild(task);
		let input = document.getElementById('input');
		input.value = '';
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
	})
}
